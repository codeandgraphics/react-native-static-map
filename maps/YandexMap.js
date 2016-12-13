import {Image, PixelRatio} from 'react-native';
import React, {Component, PropTypes} from 'react';

const defaultMapScale = ()=> {
	const isRetina = PixelRatio.get() >= 2;
	return isRetina ? 2 : 1;
};

const ROOT_URL = 'https://static-maps.yandex.ru/1.x/?';

const LOCALES = {
	en_US: 'en_US',
	en_RU: 'en_RU',
	ru_RU: 'ru_RU',
	ru_UA: 'ru_UA',
	uk_UA: 'uk_UA',
	tr_TR: 'tr_TR'
};

const MAP_TYPES = {
	NAMES: 'skl',
	TRAFFIC: 'trf',
	SATELLITE: 'sat',
	ROADMAP: 'map',
};

//Ignore image source
const {source, ...imagePropTypes} = Image.propTypes;

class Yandex extends Component {

	static rootUrl = ROOT_URL;
	static locales = LOCALES;
	static mapTypes = MAP_TYPES;

	static propTypes = {
		...imagePropTypes,

		latitude: PropTypes.number.isRequired,
		longitude: PropTypes.number.isRequired,

		size: PropTypes.shape({
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired
		}),

		zoom: PropTypes.number,

		mapType: PropTypes.arrayOf(MAP_TYPES),
		locale: PropTypes.oneOf(LOCALES)
	};

	static defaultProps = {
		scale: defaultMapScale(),
		mapType: [MAP_TYPES.ROADMAP],
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
			mapType
		} = this.props;

		const {width, height} = size;
		const rootUrl = this.constructor.rootUrl;

		return `${rootUrl}?lang=${locale}&ll=${latitude},${longitude}&size=${width},${height}` +
			`&z=${zoom}&l=${mapType}&pt=32.810152,39.889847,pm2rdl1~32.870152,39.869847,pm2rdl99`;
	}
}

export default Yandex;