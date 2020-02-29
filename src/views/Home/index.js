import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PersonActions from '../../store/modules/person/actions';

import { Card, Title, ItemName } from './styles';

class Home extends Component {
  state = {
    newGrowdev: '',
    growdevers: [],
  };

  componentDidMount() {
    const growdevers = localStorage.getItem('growdevers');
    const { addToPerson } = this.props;

    if (growdevers) {
      const list = JSON.parse(growdevers);
      this.setState({ growdevers: list });

      list.map(item => addToPerson(item));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state.growdevers) {
      localStorage.setItem('growdevers', JSON.stringify(this.state.growdevers));
    }
  }

  handleInputChange = e => {
    this.setState({ newGrowdev: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { addToPerson } = this.props;

    addToPerson(this.state.newGrowdev);

    this.setState({
      growdevers: [...this.state.growdevers, this.state.newGrowdev],
      newGrowdev: '',
    });
  };

  handleDelete = name => {
    const { removeFromPerson } = this.props;

    removeFromPerson(name);

    this.setState({
      growdevers: this.state.growdevers.filter(item => item !== name),
    });
  };

  render() {
    return (
      <>
        <Card>
          <Title>Lista Growdevers - Programa Starter 1º Edição</Title>
          <form onSubmit={this.handleSubmit}>
            <ul>
              {this.state.growdevers.map(item => (
                <li key={item}>
                  <ItemName>{item}</ItemName>
                  <button onClick={() => this.handleDelete(item)} type="button">
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <input
              label="Digite o nome"
              variant="outlined"
              type="text"
              onChange={this.handleInputChange}
              value={this.state.newGrowdev}
            />
            <button type="submit">Enviar</button>
          </form>
        </Card>
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(PersonActions, dispatch);

export default connect(null, mapDispatchToProps)(Home);
