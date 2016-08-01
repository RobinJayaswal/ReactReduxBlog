import React from 'react';
import Marked from 'marked';
import { connect } from 'react-redux';
import { fetchPost, updatePost, deletePost } from '../actions';

class Show extends React.Component {

  constructor() {
    super();

    this.state = {
      isEditingTitle: false,
      titleVal: '',
      isEditingTags: false,
      tagVal: '',
      isEditingContent: false,
      contentVal: '',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);

    this.setTitle = this.setTitle.bind(this);
    this.setTags = this.setTags.bind(this);
    this.setContent = this.setContent.bind(this);

    this.createMarkup = this.createMarkup.bind(this);

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.post) {
      this.setState({
        titleVal: newProps.post.title,
        tagVal: newProps.post.tags,
        contentVal: newProps.post.content,
      });
    }
  }


  onTitleChange(ev) {
    this.setState({
      titleVal: ev.target.value,
    });
  }

  onTagsChange(ev) {
    this.setState({
      tagVal: ev.target.value,
    });
  }

  onContentChange(ev) {
    this.setState({
      contentVal: ev.target.value,
    });
  }


  setTitle() {
    this.setState({
      isEditingTitle: false,
    });
    this.updatePost();
  }

  setTags() {
    this.setState({
      isEditingTags: false,
    });
    this.updatePost();
  }

  setContent() {
    this.setState({
      isEditingContent: false,
    });
    this.updatePost();
  }

  updatePost() {
    this.props.updatePost(this.props.params.id, { title: this.state.titleVal, content: this.state.contentVal, tags: this.state.tagVal });
  }

  deletePost() {
    this.props.deletePost(this.props.params.id);
  }

  createMarkup() {
    if (this.state.contentVal != null) {
      return { __html: Marked(this.state.contentVal) };
    } else {
      return { __html: this.state.contentVal };
    }
  }

  render() {
    let title, tags, content;

    // return loading if we have not fetched post yet
    if (!this.props.post) {
      return (
        <p>'Loading...'</p>
      );
    }

    if (!this.state.isEditingTitle) {
      title = (
        <div onClick={() => this.setState({ isEditingTitle: true, isEditingTags: false, isEditingContent: false })}>
          <span>{this.state.titleVal}</span>
        </div>
      );
    } else {
      title = (
        <input onChange={this.onTitleChange} value={this.state.titleVal} onBlur={this.setTitle} autoFocus />
      );
    }

    if (!this.state.isEditingTags) {
      tags = (
        <div onClick={() => this.setState({ isEditingTitle: false, isEditingTags: true, isEditingContent: false })}>
          <span>{this.state.tagVal}</span>
        </div>
      );
    } else {
      tags = (
        <input onChange={this.onTagsChange} value={this.state.tagVal} onBlur={this.setTags} autoFocus />
      );
    }

    if (!this.state.isEditingContent) {
      content = (
        <div onClick={() => this.setState({ isEditingTitle: false, isEditingTags: false, isEditingContent: true })}>
          <div className="note-body" dangerouslySetInnerHTML={this.createMarkup()} ref={(ref) => { this.noteContentsContainer = ref; }}></div>
        </div>
      );
    } else {
      content = (
        <textarea onChange={this.onContentChange} value={this.state.contentVal} onBlur={this.setContent} autoFocus />
      );
    }
    return (
      <div className="show-container">
        <div className="title-container">
          {title}
        </div>
        {tags}
        <div className="content-container">
          {content}
        </div>

        <div className="delete-button" onClick={this.deletePost}>
          <span>Delete</span>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => (
  {
    post: state.posts.post,
  }
);

export default connect(mapStateToProps, { fetchPost, updatePost, deletePost })(Show);
