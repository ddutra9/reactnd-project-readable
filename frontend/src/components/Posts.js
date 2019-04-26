import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Segment, Item } from 'semantic-ui-react'
import { createBrowserHistory } from 'history';
import { handleReceivePosts } from '../actions/posts'
import { handleGetCategories } from '../actions/index'
import PostList from './PostList'
import Filter from './Filter'

class Posts extends Component {

    componentDidMount() {
        const filterValue = this.props.match.params.hasOwnProperty('category_id') ? this.props.match.params.category_id : 'all'
        this.props.getPostsBy()
        this.props.getAllCategories()
    }

    handleGetPostsBy = (value) => {
        // this.props.getPostsBy(value)
        // createBrowserHistory().push(`/category/${value}`)
    }

    render() {
        const { posts, categories, sortBy, filterBy, match} = this.props
        console.log(match)

        return (
            <Container>
                <Grid columns="equal">
                    <Grid.Column width={3}>
                        <Segment.Group>
                            <Segment>
                                <Item>
                                    <Item.Header as="b">Categories</Item.Header>
                                    <Item.Content>
                                        <Item.Description>
                                            <Filter
                                                onChange={this.handleGetPostsBy}
                                                selected={match.params.category_id ? match.params.category_id : 'all'}
                                                categories={categories} />
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Segment>
                            <Segment>
                                <Item>
                                    <Item.Header as="b">Sort</Item.Header>
                                   
                                </Item>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>

                    <Grid.Column>
                        <div className="items-container">
                            <Grid columns="equal">
                                {posts.length > 0 && posts.map(post => (
                                    <PostList key={post.id} post={post} />
                                ))}
                                {posts.length === 0 && (
                                    <span style={{ marginTop: '16px' }}>
                                        {`Sorry! There are no results that match with the category '${filterBy.value}'.`}
                                    </span>
                                )}
                            </Grid>
                        </div>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}


const mapState = (state, props) => {
    return {
        posts: state.posts,
        sortBy: state.posts.sortBy,
        filterBy: state.posts.filterBy,
        categories: state.categories
    }
}

const mapDispatch = (dispatch) => {
    return {
        getPostsBy: () => dispatch(handleReceivePosts()),
        getAllCategories: () => dispatch(handleGetCategories())
    }
}

export default connect(mapState, mapDispatch)(Posts)