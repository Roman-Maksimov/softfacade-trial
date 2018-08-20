import React, { createRef, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { list } from 'redux/actions/questions';
import Progress from 'components/progress/progress';
import Popup from 'components/popup';
import styles from './styles.scss';

const OFFSET_HEIGHT = 100;

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
    };

    this.table = createRef();
    this.isPending = false;
  }

  componentDidMount() {
    this.addEvents();
    this.checkLoad();
  }

  componentWillUnmount() {
    this.removeEvents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.isPending = false;
      this.checkLoad();
    }
  }

  addEvents = () => {
    document.addEventListener('scroll', this.onDocumentScroll);
  };

  removeEvents = () => {
    document.removeEventListener('scroll', this.onDocumentScroll);
  };

  onDocumentScroll = () => {
    this.checkLoad();
  };

  checkLoad = () => {
    if (this.isPending) {
      return;
    }

    const { page, onList } = this.props;

    const tableBottom = this.table.current.getBoundingClientRect().bottom;
    const viewportHeight = document.documentElement.clientHeight;

    if (tableBottom <= viewportHeight + OFFSET_HEIGHT) {
      this.isPending = true;
      onList(page + 1);
    }
  };

  onRowClick = (item) => {
    this.setState({ item });
  };

  onPopupClose = () => {
    this.setState({ item: null });
  };

  render() {
    const { items, hasMore } = this.props;

    return (
      <div className={styles.container}>
        <table className={styles.table} cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody ref={this.table}>
            {items.map(item => (
              <tr
                key={item.question_id}
                className={styles.row}
                onClick={() => this.onRowClick(item)}
              >
                <td>{item.owner.display_name}</td>
                <td>{item.title}</td>
                <td>{moment(item.creation_date * 1000).format('DD.MM.YYYY hh:mm:ss')}</td>
              </tr>
            ))}
          </tbody>
          {hasMore && (
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <Progress type='circular' />
                </td>
              </tr>
            </tfoot>
          )}
        </table>
        {this.state.item && (
          <Popup item={this.state.item} onClose={this.onPopupClose} />
        )}
      </div>
    );
  }
}

Main.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    question_id: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      display_name: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string,
    creation_date: PropTypes.number.isRequired,
  })).isRequired,
  hasMore: PropTypes.bool,
};

const mapStateToProps = state => ({
  items: state.questions.items,
  hasMore: state.questions.hasMore,
  page: state.questions.page,
});

const mapActionsToProps = {
  onList: list,
};

export default connect(mapStateToProps, mapActionsToProps)(Main);
