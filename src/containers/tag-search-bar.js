import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { searchTags, fetchPostsWithFilter, fetchPosts } from '../actions';
// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://redux-blog-authenticate.herokuapp.com/api';

import axios from 'axios';

class TagSearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTag: null,
    };

    this.onSelectTag = this.onSelectTag.bind(this);
    this.getTags = this.getTags.bind(this);
  }

  onSelectTag(val) {
    this.setState({
      selectedTag: val,
    });
    console.log(val);
    if (val) {
      this.props.fetchPostsWithFilter(val.value);
    } else {
      this.props.fetchPosts();
    }
  }

  getTags(input, callback) {
    console.log('calling it');
    axios.get(`${ROOT_URL}/tags?query=${input}`).then(response => {
      console.log(response.data);
      const options = response.data.map(tag => {
        return { value: tag.title, label: tag.title };
      });

      const data = {
        options: options.splice(0, 5),
        complete: options.length <= 1,
      };
      setTimeout(() => {
        callback(null, data);
      }, 500);
    });
    // this.props.searchTags(input)
    //   .then(() => {
    //
    //   });
    // // api.admin.searchGroups(input)
    //     .then(groups => {
    //       let options = groups.map(group => {
    //         return { value: group.id, label: group.name };
    //       });
    //
    //       var data = {
    //         options: options.splice(0, 5),
    //         complete: options.length <= 5,
    //       };
    //
    //       setTimeout(function () {
    //         callback(null, data);
    //       }, 500);
    //     });
  }
  render() {
    return (
      <Select.Async
        name="form-field-name"
        value="one"
        loadOptions={this.getTags}
        value={this.state.selectedTag}
        autoload
        placeholder="Enter a tag"
        autosize={false}
        clearable
        multi={false}
        onChange={this.onSelectTag}
      />
  );
  }
}

export default connect(null, { searchTags, fetchPostsWithFilter, fetchPosts })(TagSearchBar);
