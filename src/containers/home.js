import React from 'react';
import PostCard from '../components/post-card';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class Index extends React.Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    if (!this.props.posts) {
      return (
        <p>No Posts</p>
      );
    } else {
      let posts = this.props.posts.map((post, index) => {
        return (
          <PostCard title={post.title} postId={post.id} tags={post.tags} key={index} />
        );
      });

      return (
        <div className="index">
          {posts}
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
  }
);

export default connect(mapStateToProps, { fetchPosts })(Index);
