//@flow

import { Image } from 'react-native';
import React, { Component, PropTypes } from 'react';
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

const MARKER_STYLES = {
	PLACEMARK: 'pm',
	PLACEMARK_2: 'pm2',
	FLAG: 'flag',
	VK: 'vk',
	ORG: 'org',
	COMMA: 'comma',
	ROUND: 'round',
	HOME: 'home',
	WORK: 'work',
	YANDEX: 'ya_ru'
};

const MARKER_COLORS = {
	WHITE: 'wt',
	DARK_ORANGE: 'do',
	DARK_GREEN: 'dg',
	DARK_BLUE: 'db',
	BLUE: 'bl',
	GREEN: 'gn',
	GRAY: 'gr',
	LIGHT_BLUE: 'lb',
	NIGHT: 'nt',
	ORANGE: 'or',
	PINK: 'pn',
	RED: 'rd',
	VIOLET: 'vv',
	YELLOW: 'yw',
	BLACK: 'bk',
	BLUE_YELLOW: 'blyw',
	A: 'a',
	B: 'b',
	ORG: 'org',
	DIR: 'dir'
};

const MARKER_SIZES = {
	SMALL: 's',
	MEDIUM: 'm',
	LARGE: 'l'
};

//Ignore image source
const {source, ...imagePropTypes} = Image.propTypes;

class Yandex extends Component {

	static rootUrl = ROOT_URL;
	static locales = LOCALES;
	static marker = {
		styles: MARKER_STYLES,
		colors: MARKER_COLORS,
		sizes: MARKER_SIZES
	};

	static propTypes = {
		...imagePropTypes,

		latitude: PropTypes.number.isRequired,
		longitude: PropTypes.number.isRequired,

		size: PropTypes.shape({
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired
		}),

		centerMarker: PropTypes.shape({
			style: PropTypes.oneOf(MARKER_STYLES),
			color: PropTypes.oneOf(MARKER_COLORS),
			size: PropTypes.oneOf(MARKER_SIZES),
			content: PropTypes.number
		}),

		zoom: PropTypes.number,

		type: PropTypes.oneOf(Constants.TYPES),
		locale: PropTypes.oneOf(LOCALES)
	};

	static defaultProps = {
		locale: LOCALES.en_US,
		scale: Constants.mapScale(),
		type: Constants.DEFAULT_TYPE,
		zoom: 10
	};

	constructor(props) {
		super(props);
		this.markers = [];
		let children = React.Children.toArray(props.children);
		children.forEach(child => {
			this.markers.push(child);
		});
	}

	render() {
		return (
			<Image
				style={this.props.style}
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
			type,
			locale
		} = this.props;

		let {width, height} = size;
		const rootUrl = this.constructor.rootUrl;
		const mappedType = this.typeMapper(type);

		if(width > 650) {
			width = 650;
		}
		if(height > 450) {
			height = 450;
		}

		return `${rootUrl}lang=${locale}&ll=${longitude},${latitude}&size=${width},${height}` +
			`&z=${zoom}&l=${mappedType}${this.marker}`;
	}

	get marker() {
		const { centerMarker, latitude, longitude } = this.props;
		if(centerMarker) {
			let markerUrl = `&pt=${longitude},${latitude},` +
				`${centerMarker.style}`;

			if(
				centerMarker.style === MARKER_STYLES.PLACEMARK ||
				centerMarker.style === MARKER_STYLES.PLACEMARK_2 ||
				centerMarker.style === MARKER_STYLES.VK
			) {
				markerUrl += centerMarker.color + centerMarker.size;
				if(centerMarker.style !== MARKER_SIZES.VK && centerMarker.content) {
					markerUrl += centerMarker.content;
				}
			}

			return markerUrl;
		} else {
			return '';
		}
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