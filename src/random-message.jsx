class Button extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
      this.props.randomNumber(e.target.value)
  }
  render() {
    return (
      <div>
        <button className="smoothie__button" value={this.props.randomNumber} onClick={this.handleClick}>Give me random smoothie</button>
      </div>
    );
  }
}

class IngredientLine extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span className="smoothie__ingredient">
                {this.props.ingredientText}
            </span>
        )
    }
}

class Smoothie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomNumber: 0
        };
        this.handleRandomNumber = this.handleRandomNumber.bind(this);
    }

    handleRandomNumber(){
        this.setState({
            randomNumber: Math.floor((Math.random() * 30) + 1)
        })
    }
    render() {
        const selectedSmoothie = this.props.smoothies[this.state.randomNumber] ? this.props.smoothies[this.state.randomNumber] : null;
        if (selectedSmoothie !== null) {
            const smoothieRecipe = selectedSmoothie.recipe
            const name = smoothieRecipe.label;
            const image = smoothieRecipe.image;
            const ingredients = smoothieRecipe.ingredients;
            const calories = smoothieRecipe.calories;
            const cautions = smoothieRecipe.cautions;
            console.log(smoothieRecipe);
            const nutrients = smoothieRecipe.totalNutrients;
            const smoothieWeight = smoothieRecipe.totalWeight * 1000;

            let shouldBeShown;
            if ( typeof name !== undefined && typeof image !== undefined) {
                shouldBeShown = true;
            }
            if (shouldBeShown) {
                let ingredientLines = [];
                {ingredients.forEach(function(ingredient, index) {
                    // <IngredientLine ingredientText={ingredient.text} />
                    ingredientLines.push(<IngredientLine ingredientText={ingredient.text} key={index}/>)
                })}
                return (
                    <div>
                      <img className="smoothie__image" width="100" src={image} />
                        <h2 className="smoothie__title">{name}</h2>
                        <p className="smoothie__ingredients">
                          {ingredientLines}
                        </p>
                      <Button value={this.state.randomNumber} randomNumber={this.handleRandomNumber}/>
                    </div>
                );
            }

        }

    }
}


var App = React.createClass({

  getInitialState: function() {
    return {
      smoothies: [],
      loading: true
    }
  },

  componentDidMount: function() {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
    var th = this;
    this.serverRequest =
      axios.get(this.props.source)
        .then(function(result) {
          th.setState({
            smoothies: result.data.hits,
            loading: false,
          });
        })
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render() {
    if (this.state.loading) {
      return (<p>loading</p>)
    }
    else {
      return (
        <div className="smoothie">
          <Smoothie smoothies={this.state.smoothies} />
        </div>
      )
    }
  }
});

ReactDOM.render(<App source="https://api.edamam.com/search?q=smoothie&from=0&to=30" />, document.querySelector("#root"));
