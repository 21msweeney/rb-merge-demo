import React from 'react';

import { breadcrumbModels } from 'components/Breadcrumbs/Breadcrumbs.data';

import { Breadcrumbs as BreadcrumbsM} from 'components/Breadcrumbs/Breadcrumbs'

export const Breadcrumbs = (props) => {
	return <BreadcrumbsM model={breadcrumbModels} />
}

// Breadcrumbs.propTypes = {
// 	model: PropTypes.oneOf(['small', 'large', 'medium'])
//  }