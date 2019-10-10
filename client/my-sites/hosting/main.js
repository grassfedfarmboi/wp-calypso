/** @format */

/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import SidebarNavigation from 'my-sites/sidebar-navigation';
import PageViewTracker from 'lib/analytics/page-view-tracker';
import DocumentHead from 'components/data/document-head';
import Card from 'components/card';
import CardHeading from 'components/card-heading';
import MaterialIcon from 'components/material-icon';
import Spinner from 'components/spinner';
import { getSelectedSite, getSelectedSiteId, getSelectedSiteSlug } from 'state/ui/selectors';
import { requestAtomicHostingPmaNonce } from 'state/data-getters';

/**
 * Style dependencies
 */
import './style.scss';

const DataSection = ( { title, data } ) => {
	return (
		<tr>
			<th>{ title }:</th>
			<td>{ data }</td>
		</tr>
	);
};

const Hosting = ( { translate, atomicPmaNonce, siteId } ) => {
	const dummyInfo = {
		[ translate( 'URL' ) ]: 'sftp1.wordpress.com',
		[ translate( 'Port' ) ]: 22,
		[ translate( 'Username' ) ]: 'test',
		[ translate( 'Password' ) ]: 'test',
	};

	return (
		<Main className="hosting is-wide-layout">
			<PageViewTracker path="hosting/:site" title="Hosting" />
			<DocumentHead title={ translate( 'Hosting' ) } />
			<SidebarNavigation />
			<div className="hosting__cards">
				<Card>
					<div className="hosting__card-icon-col">
						<MaterialIcon className="hosting__card-icon" icon="cloud" size={ 32 } />
					</div>
					<div className="hosting__card-col">
						<CardHeading>{ translate( 'SFTP Information' ) }</CardHeading>
						<p>
							{ translate( "Access and edit your website's files directly using an FTP client." ) }
						</p>
						<table className="hosting__info-table">
							<tbody>
								{ map( dummyInfo, ( data, title ) => (
									<DataSection key={ title } { ...{ data, title } } />
								) ) }
							</tbody>
						</table>
					</div>
				</Card>
				<Card>
					<div className="hosting__card-icon-col">
						<MaterialIcon className="hosting__card-icon" icon="dns" size={ 32 } />
					</div>
					<div className="hosting__card-col">
						<CardHeading>{ translate( 'Database Access' ) }</CardHeading>
						<p>
							{ translate(
								'Manage your databases with PHPMyAdmin and run a wide range of operations with MySQL.'
							) }
						</p>
						{ ( ! atomicPmaNonce || ! siteId ) && <Spinner /> }
						{ atomicPmaNonce && siteId && (
							<a
								href={ `https://specialurl?wpcomid=${ siteId }&nonce=${ atomicPmaNonce }` }
								target="_blank"
							>
								Log in to PhpMyAdmin
							</a>
						) }
					</div>
				</Card>
			</div>
		</Main>
	);
};

export default connect( state => ( {
	site: getSelectedSite( state ),
	siteId: getSelectedSiteId( state ),
	siteSlug: getSelectedSiteSlug( state ),
	atomicPmaNonce: requestAtomicHostingPmaNonce( getSelectedSiteId( state ) ).data,
} ) )( localize( Hosting ) );
