import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      items: [],
      error: false
    }
  }

  componentDidMount() {
    let items = fetch('https://still-anchorage-53867.herokuapp.com/items')
      .then(response => response.json())
      .then((jsonData) => {
        this.setState({
          loading: false,
          items: jsonData.results
        });
      })
      .catch((error) => {
        console.error(error.message)
        this.setState({error: true})
      });

  }

  render() {
    const loading = this.state.loading;
    const items = this.state.items;
    const error = this.state.error;

    if (loading) {
      return (<p>Loading...</p>)
    } else if (error) {
      return (<p>There was an error</p>)
    } else {
      return (<div>{items.map((d,i) => {return <p key={i}>{d.name}</p>})}</div>)
    }
  }
}

export default App;
