import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Segment, Item } from 'semantic-ui-react'
import { handleReceivePostsBy, handleSortPost } from '../actions/posts'
import { handleGetCategories } from '../actions/index'
import PostList from './PostList'
import Filter from './Filter'
import SortPost from './SortPost'
import {withRouter} from 'react-router-dom'

class Posts extends Component {

    state = {
        filterBy: undefined,
        sortBy: 'timestampAsc',
    }

    componentDidMount() {
        this.props.getPostsBy()
        this.props.getAllCategories()
    }

    handleChangeFilter = (e, { value }) => {
        if(value === 'all'){
            this.props.getPostsBy()
            this.setState({filterBy : undefined});
        } else{
            console.log(value)
            this.props.getPostsBy(value)
            this.setState({filterBy : value});
        }
    }

    handleSortBy = (value) => {
        this.props.orderPosts(value.id, this.props.posts)
        this.setState({sortBy : value.id});
    }

    render() {
        const { categories, posts } = this.props
        const {filterBy, sortBy} = this.state

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
                                                onChange={this.handleChangeFilter}
                                                selected={filterBy ? filterBy : 'all'}
                                                categories={categories} />
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Segment>
                            <Segment>
                                <Item>
                                    <Item.Header as="b">Sort</Item.Header>
                                    <SortPost
                                        onChange={this.handleSortBy}
                                        selected={sortBy} />
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
                                    `Sorry! There are no results that match with the category '${filterBy.value}'.`
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
        categories: state.categories,
        posts: state.posts
    }
}

const mapDispatch = (dispatch) => {
    return {
        getPostsBy: (value) => dispatch(handleReceivePostsBy(value)),
        getAllCategories: () => dispatch(handleGetCategories()),
        orderPosts: (order, posts) => dispatch(handleSortPost(order, posts))
    }
}

export default connect(mapState, mapDispatch)(Posts)