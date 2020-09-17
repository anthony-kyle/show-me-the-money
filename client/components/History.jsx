import React from "react"
import { connect } from "react-redux"

import PastMeeting from "./PastMeeting"
import Graph from "./Graph"

import { APIgetPastMeetings } from '../apis/index.js'
import { togglePage } from '../actions/auth.js'

class History extends React.Component {
  state = {
    details: '',
  }

  componentDidMount() {
    APIgetPastMeetings().then(deets => {
      this.setState({ details: deets })

    })
  }

  render() {
    let meeting = ''
    if (this.state.details.length > 0) {
      meeting = this.state.details
    }

    return (
      <>
        <div className="container" >
          <h2 className="title is-2">Meeting Overview</h2>

          <Graph limit={true} />
          {
            this.props.page.currentPage === "list"
              ?
              <>
                <h2 className="title is-2">Meeting History</h2>
                {meeting && meeting.map((info, i) => {
                  return (
                    <div className="card">
                      <header className="card-header">
                        <p className="card-header-title">{info.meeting_name}</p>
                        <time className="card-header-title level-right" dateTime="">Date: {info.created_at}</time>
                      </header>
                      <div className="card-content">
                        <div className="content">
                          <button className="button" onClick={() => this.props.dispatch(togglePage("details", 1))}>Details</button>
                        </div>
                      </div>
                      <footer className="card-footer">
                      </footer>
                    </div>
                  )
                })}
              </>
              :
              <PastMeeting id={this.props.page.currentId} />

          }


        </div >
      </>
    )
  }
}

const mapStateToProps = ({ page }) => {
  return {
    page
  }
}

export default connect(mapStateToProps)(History)

// this needs to go on the index page ->
{
  /* <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script> */
}