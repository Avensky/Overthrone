import React, { Component } from 'react'
import './Search.module.scss';
import axios from 'axios';
import Loader from '../../components/UI/Spinner/loader.gif';
import PageNavigation from '../PageNavigation/PageNavigation';


class Search extends Component {
	state = {
		query: '',
		results: {},
		loading: false,
		message: '',
		totalResults: 0,
		totalPages: 0,
		currentPageNo: 0,
	};

	handleOnInputChange = (event) => {
		const query = event.target.defaultValue;
		if ( ! query ) {
			this.setState({ query, results: {}, message: '' } );
		} else {
			this.setState({ query, loading: true, message: '' }, () => {
				this.fetchSearchResults(1, query);
			});
		}
	};

	


	renderSearchResults = () => {
		const { results } = this.state;

		if ( Object.keys( results ).length && results.length ) {
			return (
				<div className="results-container">
					{ results.map( result => {
						return (
							<a key={ result.id } href={ result.previewURL } className="result-item">
								<h6 className="image-username">{result.user}</h6>
							</a>
						)
					} ) }

				</div>
			)
		}
	};

	render() {
		const { query, loading, message} = this.state;


		return (
			<div className="container">
			{/*	Heading*/}
			<h2 className="heading">Live Search: React Application</h2>
			{/* Search Input*/}
			<label className="search-label" htmlFor="search-input">
				<input
					type="text"
					name="query"
					defaultValue={ query }
					id="search-input"
					placeholder="Search..."
					// ref={input => this.search = input}
					onChange={this.handleOnInputChange}
					//onChange={this.handleInputChange}
				/>

				  
				<i className="fa fa-search search-icon" aria-hidden="true"/>
			</label>

			{/*	Error Message*/}
				{message && <p className="message">{ message }</p>}

			{/*	Loader*/}
			<img src={ Loader } className={`search-loading ${ loading ? 'show' : 'hide' }`} alt="loader"/>

			{/*Navigation*/}
			<PageNavigation
				loading={loading}
//				showPrevLink={showPrevLink}
//				showNextLink={showNextLink}
//				handlePrevClick={ () => this.handlePageClick('prev', event )}
//				handleNextClick={ () => this.handlePageClick('next', event )}
			/>

			{/*	Result*/}
			{ this.renderSearchResults() }

			{/*Navigation*/}
			<PageNavigation
				loading={loading}
//				showPrevLink={showPrevLink}
//				showNextLink={showNextLink}
//				handlePrevClick={ () => this.handlePageClick('prev', event )}
//				handleNextClick={ () => this.handlePageClick('next', event )}
			/>

			</div>
		)
	}
}

export default Search