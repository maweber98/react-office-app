import './App.css';
import React from 'react';

class App extends React.Component {
  state = {
    randomQuote: [],
    quoteAuthor: "",
    answer: "",
    isLoading: "active",
    score: 0,
    questionCount: 0,
    gameState: true
  }

  getNewQuestion = () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://officeapi.dev/api/quotes/random';
      fetch (proxyUrl + targetUrl)
        .then(response => response.json())
        .then(response => {
          this.setState((prevState) => ({ 
            randomQuote: response.data.content,
            quoteAuthor: response.data.character.firstname,
            isLoading: "",
            questionCount: prevState.questionCount +1
          }))
        })
        .catch(error => {
          console.log(error);
        });
  }

  componentDidMount() {
    this.getNewQuestion();
  }

  handleAnswerInput = (event) => {
    console.log("Answer Input ", event.target.value);
    this.setState({
      answer: event.target.value
    });
  }

  checkGameState = () => {
    if(this.state.questionCount === 5) {
      this.setState({
        gameState: false
      })
    }
  }

  handleCheckAnswer = (event) => {
    event.preventDefault();
    if(this.state.answer === this.state.quoteAuthor) {
      this.setState((prevState) => ({
        score: prevState.score +1
      }));
    }
    this.getNewQuestion();
    this.checkGameState();
    this.handleGameOverMessage();
    this.setState(
      { 
        randomQuote: [],
        isLoading: 'active'
      });
  }

  handleGameOverMessage = () => {
    if(!this.state.gameState && this.state.score === 5) {
      console.log('Fantastic');
    } else if(!this.state.gameState) {
      console.log('Try again');
    }
    console.log('handleGameOverMessage');
  }

  render() {
    return (
      <div className="App">
        <div className="body jumbotron-image">
        <h1 className="app-title">Office Quiz</h1>
        <p style={{display: this.state.gameState ? 'flex' : 'none'}}>Who said the following:</p>
        <div className={`ui ${this.state.isLoading} inline loader`}></div>
        <div style={{display: this.state.gameState ? 'inline' : 'none'}} className="random-quote">{this.state.randomQuote}</div>
        <form onSubmit={this.handleCheckAnswer}>
        <label>
          <select
            className="ui selection dropdown"
            value={this.state.answer} 
            onChange={this.handleAnswerInput}
            style={{display: this.state.gameState ? 'inline' : 'none', fontSize: "20px", height: "38px", background: "rgba(34,36,38,.15)", margin: "10px 10px 10px 0px" }}
            >
              <option value="">Select Your Answer</option>
              <option value="Andy">Andy</option>
              <option value="Angela">Angela</option>
              <option value="Creed">Creed</option>
              <option value="Darryl">Darryl</option>
              <option value="Dwight">Dwight</option>
              <option value="Erin">Erin</option>
              <option value="Jim">Jim</option>
              <option value="Kelly">Kelly</option>
              <option value="Kevin">Kevin</option>
              <option value="Meredith">Meredith</option>
              <option value="Michael">Michael</option>
              <option value="Oscar">Oscar</option>
              <option value="Pam">Pam</option>
              <option value="Phyllis">Phyllis</option>
              <option value="Ryan">Ryan</option>
              <option value="Stanley">Stanley</option>
              <option value="Toby">Toby</option>
            </select>
          </label>
        <button style={{ fontSize: "20px", display: this.state.gameState ? "inline" : "none" }}value="Submit" className="ui submit primary button score">
          Submit
        </button>
        </form>
          <div>
            <h2 className="score">Score: {this.state.score}</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
