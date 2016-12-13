import Yandex from './providers/Yandex';

const TYPES = {
	HYBRID: 'hybrid',
	SATELLITE: 'satellite',
	ROADMAP: 'roadmap',
};

class StaticMap {
	static TYPES = TYPES;
}

StaticMap.Yandex = Yandex;

export default StaticMap;