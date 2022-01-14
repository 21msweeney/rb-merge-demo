import React from 'react';

import styles from './Breadcrumbs.module.scss';

const breadcrumbModels = [
		{
			"title": "Living",
			"pageTitle": "Modern Living Room Furniture",
			"url": "catalog/living",
			"key": "RM_LIVING_SPACES",
			"type": "CATEGORY",
			"category": false
		},
		{
			"title": "Sofas & Loveseats",
			"pageTitle": "Modern Sofas & Loveseats",
			"url": "catalog/living/sofas-and-loveseats",
			"key": "SOFA",
			"type": "SUBCATEGORY",
			"category": false
		},
		{
			"title": "Metro Sofas",
			"url": "catalog/living/sofas-and-loveseats/metro-sofas",
			"key": "METRP_SOFA_10",
			"type": "PRODUCT_GROUP",
			"category": false
		}
	]
export const Breadcrumbs = (props) => {
		// const { breadcrumbModels = [] } = props;

	return (
		<ul
			className={`${styles.breadcrumbs} tw-hidden-for-print`}
			role="region"
			aria-label="Breadcrumb"
			itemScope
			itemType="http://schema.org/BreadcrumbList"
		>
			<li className={styles.breadcrumb} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
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
				<span aria-hidden="true" className={styles['breadcrumb-spacer']}>
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
							className={styles.breadcrumb}
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
									<span aria-hidden="true" className={styles['breadcrumb-spacer']}>
										&gt;
									</span>
								</>
							}
							{
								!isNotLastBreadcrumb &&
								<>
									<span className={styles.active} itemProp="name">{title}</span>
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
