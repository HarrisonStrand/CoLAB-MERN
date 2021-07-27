import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
	appBar: {
		borderRadius: 15,
		margin: '30px 0',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heading: {
		color: 'rgba(18, 108, 235, 92)',
	},
	image: {
		paddingTop: '30px',
	},
}));