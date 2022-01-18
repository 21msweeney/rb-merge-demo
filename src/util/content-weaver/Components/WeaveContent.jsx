import React from 'react';
import { observer } from 'mobx-react';

import { GetUrlContent } from 'util/content-weaver/Components/GetUrlContent';

export const WeaveContent = observer((props) => {
	if (!props || props.shouldRender === false) {
		return null;
	}

	if (props.children) {
		return props.children;
	}

	// good for smart components
	if (props.elementContent) {
		const ElementContent = props.elementContent;

		return <ElementContent {...props} />;
	}

	// good for conditional rendering
	if (props.functionContent) {
		return props.functionContent(props);
	}

	if (props.urlToGet) {
		return <GetUrlContent {...props} />;
	}

	return null;
});
