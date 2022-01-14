import React from 'react';

import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = (props) => {
	const { breadcrumbModels = [] } = props;

	return (
		<ul
			className={`${styles.breadcrumbs} tw-hidden-for-print`}
			role="region"
			aria-label="Breadcrumb"
			itemScope
			itemType="http://schema.org/BreadcrumbList"
		>
			<li className="breadcrumb" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
				<meta itemProp="position" content="1" />
				<a
					data-adobe-position={`1:${breadcrumbModels.length}`}
					data-tr-link-event-comp-position={`1:${breadcrumbModels.length}`}
					data-qa="breadcrumb-item-link-1-home"
					href="/"
					itemProp="item"
				>
					<span itemProp="name">Home</span>
				</a>
				<span aria-hidden="true" className="breadcrumb-spacer">
					&gt;
				</span>
			</li>
			{
				breadcrumbModels.map((breadcrumb, index) => {
					const {
						url,
						title,
						isCategory,
					} = breadcrumb;
					const isNotLastBreadcrumb = (index + 1) < breadcrumbModels.length;
					return (
						<li
							className="breadcrumb"
							key={`breadcrumb-${index + 2}`}
							itemProp="itemListElement"
							itemScope
							itemType="http://schema.org/ListItem"
						>
							<meta itemProp="position" content={index + 2} />
							{
								isNotLastBreadcrumb &&
								<>
									<a
										data-adobe-position={`${index + 2}:${breadcrumbModels.length}`}
										data-tr-link-event-comp-position={`${index + 2}:${breadcrumbModels.length}`}
										data-qa={`breadcrumb-item-link-${index + 2}-category-${isCategory}`}
										href={`/${url}`}
										itemProp="item"
									>
										<span itemProp="name">{title}</span>
									</a>
									<span aria-hidden="true" className="breadcrumb-spacer">
										&gt;
									</span>
								</>
							}
							{
								!isNotLastBreadcrumb &&
								<>
									<span className="active" itemProp="name">{title}</span>
									<meta content={`${url}`} itemProp="item" />
								</>
							}
						</li>
					);
				})
			}
		</ul>
	);
};
