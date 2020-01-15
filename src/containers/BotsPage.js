import React from "react";
import BotCollection from './BotCollection'
import BotArmy from './YourBotArmy'

const botUrl = 'https://bot-battler-api.herokuapp.com/api/v1/bots'

class BotsPage extends React.Component {
  //start here with your code for step one
  constructor() {
    super()
    this.state = {
      allBots: [],
      myArmy: []
    }
  }

  componentDidMount() {
    fetch(botUrl)
    .then(response => response.json())
    .then(data => this.setState({allBots: data}))
  }

  filteredBots = () => this.state.allBots.filter(bot => !this.state.myArmy.includes(bot))

  render() {
    return (
      <div>
        <BotCollection bots={this.filteredBots()} />
      </div>
    );
  }

}

export default BotsPage;
