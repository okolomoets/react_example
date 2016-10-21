var EventApplication = React.createClass({
  getInitialState: function () {
    return {
      events: [],
      sort: "name",
      order: "asc"
    };
  },
  componentDidMount: function () {
    this.getDataFromApi();
  },
  getDataFromApi: function () {
    var self = this;
    $.ajax({
      url: '/api/events',
      success: function (data) {
        self.setState({events: data});
      },
      error: function (xhr, status, error) {
        alert("Cannot get Data from API: ", error)
      }
    });
  },
  handleSearch: function (events) {
    this.setState({events: events});
  },

  handleSortColumn: function (name, order) {
    if (this.state.sort != name){
      order = "asc"
    }

    $.ajax({
      url: "/api/events",
      data: {sort_by: name, order: order },
      method: "GET",
      success: function (data) {
        this.setState({events: data, sort: name, order: order});
      }.bind(this),
      error: function (xhr, status,error) {
        alert("Cannot sort events: ", error);
      }
    });
  },

  handleAdd: function (event) {
    var events = this.state.events;
    events.push(event);
    this.setState({events: events});
  },

  handleUpdateRecord: function (old_event, event) {
    var events = this.state.events.slice();
    var index = events.indexOf(old_event);
    events.splice(index, 1, event);
    this.setState({events: events});
  },

  handleDeleteRecord: function (event) {
    var events = this.state.events.slice();
    var index = events.indexOf(event);
    events.splice(index, 1);
    this.setState({events: events});
  },

  render: function(){
    return(
      <div className="container">
        <div className="jumbotron">
          <h1>ReactJS Tutorial</h1>
          <p>by Oleg Kolomoets</p>
        </div>

        <div className="row">
          <div className="col-md-3">
            <SearchForm handleSearch={this.handleSearch} />
          </div>

          <div className="com-md-8">
            <NewForm handleAdd={this.handleAdd} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <EventTable events={this.state.events}
                        sort={this.state.sort}
                        order={this.state.order}
                        handleDeleteRecord={this.handleDeleteRecord}
                        handleUpdateRecord={this.handleUpdateRecord}
                        handleSortColumn={this.handleSortColumn}
            />
          </div>
        </div>
      </div>
    )
  }
});