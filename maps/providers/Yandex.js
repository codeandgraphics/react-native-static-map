import {Image} from 'react-native';
import React, {Component, PropTypes} from 'react';
import * as Constants from '../Constants';

const ROOT_URL = 'https://static-maps.yandex.ru/1.x/?';

const LOCALES = {
	en_US: 'en_US',
	en_RU: 'en_RU',
	ru_RU: 'ru_RU',
	ru_UA: 'ru_UA',
	uk_UA: 'uk_UA',
	tr_TR: 'tr_TR'
};

//Ignore image source
const {source, ...imagePropTypes} = Image.propTypes;

class Yandex extends Component {

	static rootUrl = ROOT_URL;
	static locales = LOCALES;

	static propTypes = {
		...imagePropTypes,

		latitude: PropTypes.number.isRequired,
		longitude: PropTypes.number.isRequired,

		size: PropTypes.shape({
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired
		}),

		zoom: PropTypes.number,

		type: PropTypes.oneOf(Constants.TYPES),
		locale: PropTypes.oneOf(LOCALES)
	};

	static defaultProps = {
		scale: Constants.mapScale(),
		type: Constants.DEFAULT_TYPE,
		zoom: 10
	};

	render() {
		return (
			<Image
				style={[this.props.style, this.props.size]}
				source={{uri: this.mapUrl}}
			/>
		);
	}

	get mapUrl() {
		const {
			latitude,
			longitude,
			zoom,
			size,
			scale,
			format,
			type,
			locale
		} = this.props;

		const {width, height} = size;
		const rootUrl = this.constructor.rootUrl;
		const mappedType = this.typeMapper(type);

		return `${rootUrl}?lang=${locale}&ll=${latitude},${longitude}&size=${width},${height}` +
			`&z=${zoom}&l=${mappedType}&pt=32.810152,39.889847,pm2rdl1~32.870152,39.869847,pm2rdl99`;
	}

	typeMapper(type) {
		switch (type) {
			case Constants.TYPES.SATELLITE:
				return 'sat';
			case Constants.TYPES.HYBRID:
				return 'sat,skl';
			case Constants.TYPES.ROADMAP:
				return 'map';
			default:
				return Constants.DEFAULT_TYPE;
		}
	}
}

export default Yandex;