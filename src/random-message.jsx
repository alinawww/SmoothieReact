class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    axios.get('https://api.edamam.com/search?q=' + this.props.searchTerm + '&from=0&to=30')
      .then(res => {
        // console.log(res);
        const allRecipes = res.data.hits;
        const randomNumberBetween0and30 = Math.floor(Math.random() * 30);
        const randomRecipe = allRecipes[randomNumberBetween0and30];
        console.log(randomRecipe);
        const smoothieName = randomRecipe.recipe.label;
        const smoothieImageUrl = randomRecipe.recipe.image;
        const smoothieIngredientLines = randomRecipe.recipe.ingredientLines;
        this.setState({
            name: smoothieName
        });
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <FetchDemo searchTerm="smoothie"/>,
  document.getElementById('root')
);
