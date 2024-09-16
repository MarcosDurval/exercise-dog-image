import React from 'react';
import './BuscaImagem.css';

class Busca extends React.Component {
  constructor() {
    super();
    this.state = {
      valor: 'texto',
      Ima: [],
      loading: true,
    };
    this.fetchDog = this.fetchDog.bind(this);
    this.saveDog = this.saveDog.bind(this);
  }

  componentDidMount() {
    this.fetchDog();
  }

  async fetchDog() {
    this.setState(
      { loading: true },
      async () => {
        const requestDog = await fetch('https://dog.ceo/api/breeds/image/random');
        const responseDog = await requestDog.json();
        if (!responseDog.message.includes('terrier')) {
          this.setState({
            valor: responseDog.message,
            loading: false,
          });
        } else {
          this.setState((prev) => ({
            valor: prev.valor,
            loading: false,
          }));
        }
      },
    );
  }

  saveDog() {
    this.setState(({ Ima, valor }) => ({
      Ima: [...Ima, valor],
    }));
    this.fetchDog();
  }

  render() {
    const { valor, Ima, loading } = this.state;
    const texto = <span>Loading</span>;
    return (
      <>
        <div className="teste">
          {Ima.map((element, index) => (<img
            className="tamanho"
            src={ element }
            key={ index }
            alt="cachorro"
          />))}
        </div>
        <div className="xD">
          { loading ? texto
            : <img className="tamanho alinhamento" src={ valor } alt="cachorro" /> }
          <button type="button" onClick={ this.fetchDog }>New Imagem</button>
          <button type="button" onClick={ this.saveDog }>salvar</button>
        </div>
      </>
    );
  }
}

export default Busca;
