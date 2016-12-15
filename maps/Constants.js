//@flow

import {PixelRatio} from 'react-native';

export const TYPES = {
	HYBRID: 'hybrid',
	SATELLITE: 'satellite',
	ROADMAP: 'roadmap'
};

export const DEFAULT_TYPE = TYPES.ROADMAP;

export const mapScale = ()=> {
	const isRetina = PixelRatio.get() >= 2;
	return isRetina ? 2 : 1;
};