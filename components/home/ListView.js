import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Element, scroller } from 'react-scroll'
import ListModule from './ListModule'

class ListView extends Component {
	componentDidUpdate (prevProps) {
		if (this.props.activeID !== prevProps.activeID) {
			if (this.props.openList && !this.props.listOpen) this.props.openList()
			setTimeout(this.scrollToEl, 1000)
		}
	}

	scrollToEl = () => {
		const { activeID } = this.props
		scroller.scrollTo(`${activeID}`, {
			duration: 1000,
			smooth: true,
			containerId: 'list-view',
			offset: this.props.openList ? -230 : -130
		})
	}

	renderList = () => {
		const { list, setActiveMarker, activeID, openList, listOpen, isMobile } = this.props
		return list.map((li, i) => (
			<li
				ref={r => {
					this[li.id] = r
				}}
				key={li.id + i}
			>
				<Element name={`${li.id}`}>
					<ListModule
						data={li}
						setActiveMarker={setActiveMarker}
						activeID={activeID}
						shouldOpen={activeID === li.id}
						openList={openList}
						listOpen={listOpen}
						isMobile={isMobile}
					/>
				</Element>
			</li>
		))
	}

	render () {
		return (
			<div className='outer-container'>
				<ul>{this.renderList()}</ul>
				<style jsx>{`
					ul {
						box-sizing: border-box;
						margin-top: 2em;
						padding: 0;
					}
				`}</style>
			</div>
		)
	}
}

ListView.propTypes = {
	activeID: PropTypes.string.isRequired,
	list: PropTypes.arrayOf(PropTypes.object).isRequired,
	listOpen: PropTypes.bool,
	openList: PropTypes.func,
	setActiveMarker: PropTypes.func.isRequired
}

export default ListView
