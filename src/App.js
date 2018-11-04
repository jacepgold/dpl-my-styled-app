import React from 'react';
import { Header, Button, Segment, Card, Icon, Grid } from 'semantic-ui-react';
import styled, { keyframes } from 'styled-components';
import HeaderText from './styled/HeaderText';
import axios from 'axios';

const repos = [
  { id: 1, stargazers_count: 0, full_name: 'wdjungst/create-repack-app', description: 'foo' },
  { id: 2, stargazers_count: 1, full_name: 'wdjungst/create-react-app', description: 'foo' },
  { id: 3, stargazers_count: 0, open_issues: 7, full_name: 'wdjungst/somesuperlongnameyayfoo', description: 'foo' },
  { id: 4, stargazers_count: 1, full_name: 'wdjungst/yahtzee', description: 'foo' },
  { id: 5, stargazers_count: 0, full_name: 'wdjungst/words_with_friends', description: 'foo' },
  { id: 6, stargazers_count: 0, full_name: 'wdjungst/hello', description: 'foo' },
  { id: 7, stargazers_count: 1, full_name: 'wdjungst/cat-tinder', description: 'foo' },
  { id: 8, stargazers_count: 0, full_name: 'wdjungst/devpointlabs', description: 'foo' },
]

const rotate360 = keyframes`
  from {   
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Star = styled.div`
  display: inline-block;
  color: yellow;
  text-shadow: 1px 1px 1px black;
  animation: ${rotate360} 2s linear infinite;
`

const ButtonLink = styled.a`
  float: right;
  padding: 10px 30px;
  border-radius: 10px;
  color: ${ props => props.theme.fg } !important;
  background-color: ${ props => props.theme.bg }
`

const AppContainer = styled.div`
  background: linear-gradient(to bottom right, aliceblue, black);
`

const Transparent = styled.div`
  background: transparent !important;
`

const StyledCard = styled(Card)`
  height: 200px;
`

const IssueCard = StyledCard.extend`
  border: solid 3px red !important;
`

const Truncated = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SearchBox = styled.input.attrs({ 
  placeholder: 'Search...',
})`
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`

class App extends React.Component {
  state = { repos: [], visible: [] }

  componentDidMount() {
    this.setState({ repos });
    //axios.get('https://api.github.com/users/jacepgold/repos?sort=create')
    //  .then( res => this.setState({ repos: res.data, visible: res.data }) )
  }

  search = () => {
    const regex = new RegExp(this.searchTerm.value)
    const { repos } = this.state;
    if (this.searchTerm.value === '')
      this.setState({ visible: repos })
    else
      this.setState({ visible: repos.filter( r => regex.test(r.full_name) )})
  }

  render() {
    return (
      <AppContainer>
        <Header 
          fSize="large" 
          as={ (props) => <HeaderText {...props} /> }
        >
          My Portfolio</Header
        >
        <Segment as={Transparent}>
          <Header as={HeaderText}>My Projects</Header>
          <label>Search</label>
          <SearchBox
            onChange={this.search}
            innerRef={ n => this.searchTerm.value }
          />
          <Grid>
            <Grid.Row>
              { this.state.repos.map( r => {  
                  const CardType = r.open_issues > 0 ? IssueCard : StyledCard
                  return (
                    <Grid.Column key={r.id} width={4}>
                      <CardType>
                        <Card.Content>
                          <Card.Header>
                            <Truncated>
                              { r.full_name }
                            </Truncated>
                          </Card.Header>
                          <Card.Meta>
                            { r.description }
                          </Card.Meta>
                          { r.stargazers_count > 0 &&
                              <Star>
                                <Icon name="star" />
                              </Star>
                          }
                        </Card.Content>
                        <Card.Content extra>
                          <ButtonLink
                            href={r.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </ButtonLink>
                        </Card.Content>
                      </CardType>
                    </Grid.Column>
                  )
                })
              }
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment as={Transparent}>
          <Header as={HeaderText}>Contact</Header>
        </Segment>
      </AppContainer>
    )
  }
}

export default App;
