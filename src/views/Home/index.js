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
    const { person } = this.props;
    if (person.length > 0) {
      this.setState({ growdevers: person });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Ao atualizar o state executar alguma coisa
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

const mapStateToProps = state => ({
  person: state.person,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PersonActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
