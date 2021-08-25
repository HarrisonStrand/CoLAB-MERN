import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';


const secret = 'test';

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) return res.status(404).json({ message: 'User does not exist'});

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

		if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Credentials'});

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: '1h' });

		res.status(200).json({ result: existingUser, token});
		
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong'});
	}
}

export const signup = async (req, res) => {
	const { email, password, confirmPassword, firstName, lastName} = req.body;

	try {
		const existingUser = await User.findOne({ email })

		if (existingUser) return res.status(400).json({ message: 'User already exists'});

		if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

		const token = jwt.sign({ email: result.email, id: result._id }, secret, {expiresIn: '1h'});

		res.status(200).json({ result, token})

	} catch (error) {
		res.status(500).json({ message: 'Something went wrong'});
	}
}

export const updateUserProfile = async (req, res) => {
	const user = await User.findById(req.user._id);

	if(user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.pic = req.body.pic || user.pic;

		if(req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save();

		res.json({
			_id:updatedUser._id,
			name:updatedUser.name,
			email:updatedUser.email,
			pic:updatedUser.pic,
			token:generateToken(updatedUser._id),
		})
	}

	else{
		res.status(404)
		throw new Error('Invalid')
	}
}
