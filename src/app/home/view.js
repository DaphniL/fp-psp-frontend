import Mn from 'backbone.marionette';
import Bb from 'backbone';
import c3 from 'c3';
import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';
import Template from './template.hbs';
import session from '../../common/session';
import storage from '../hubs/storage';
import ActivityFeed from './activities/collection';
import FeedItem from './activities/item/view';

export default Mn.View.extend({
  template: Template,
  events: {
    'click #menu-right': 'nextPageActivity',
    'click #menu-left': 'previousPageActivity'
  },
  initialize(options) {
    this.app = options.app;
    this.collection;

    if (this.model) {
      this.organization = this.model.attributes;
      setTimeout(() => {
        let logo =
          this.model.attributes.logoUrl || '/static/images/icon_logo_place.png';
        $('#sub-header-image').attr('src', logo);
        if (
          !$.isEmptyObject(this.organization.dashboard.snapshotTaken.byMonth)
        ) {
          $('.no-data').hide();
          this.chart(this.organization.dashboard.snapshotTaken.byMonth);
        }
      }, 0);
    }
  },

  nextPageActivity(){
    if (this.collection.currentPage < this.collection.totalPages) {
      let params ={};
      params.page = this.collection.currentPage + 1;
      this.activities.fetch({
        data: params,
        success: (collection, response) => {
          const activityFeed = this.$el.find('#activity-feed-admin');
          activityFeed.empty();

          this.collection = collection;

          this.collection.reset(response.list);
          this.collection.currentPage = response.currentPage;
          this.collection.totalPages = response.totalPages;

          this.collection.each(model => {
            const item = new FeedItem({ model });
            activityFeed.append(item.render().el);
          });

        }
      });
    }
  },

  previousPageActivity(){
    if (this.collection.currentPage > 0) {
      let params ={};
      params.page = this.collection.currentPage - 1;
      this.activities.fetch({
        data: params,
        success: (collection, response) => {
          const activityFeed = this.$el.find('#activity-feed-admin');
          activityFeed.empty();

          this.collection = collection;

          this.collection.reset(response.list);
          this.collection.currentPage = response.currentPage;
          this.collection.totalPages = response.totalPages;

          this.collection.each(model => {
            const item = new FeedItem({ model });
            activityFeed.append(item.render().el);
          });

        }
      });
    }
  },

  onRender() {
    if (this.model.get('id')) {
      this.app.updateSubHeader(storage.getSubHeaderItems(this.model));
    }
    this.renderFeed();
  },

  renderFeed() {
    this.activities = new ActivityFeed();
    this.activities.fetch({
      success: (collection, response) => {
        const activityFeed = this.$el.find('#activity-feed-admin');
        activityFeed.empty();

        this.collection = collection;

        this.collection.reset(response.list);
        this.collection.currentPage = response.currentPage;
        this.collection.totalPages = response.totalPages;

        this.collection.each(model => {
          const item = new FeedItem({ model });
          activityFeed.append(item.render().el);
        });

      }
    });
  },
  formatDate(key) {
    return moment(key)
      .locale(session.get('locale') ? session.get('locale') : 'es')
      .format('MMMM');
  },

  generateData(byMonthData) {
    let snapshots = this.sortData(byMonthData);
    let data = {};
    data.x = ['x', ..._.keys(snapshots).map(key => this.formatDate(key))];
    data.data1 = ['data1', ..._.values(snapshots)];

    return data;
  },

  sortData(data) {
    return Object.keys(data)
      .sort()
      .reduce((result, key) => {
        result[key] = data[key];
        return result;
      }, {});
  },

  chart(byMonthData) {
    const data = this.generateData(byMonthData);
    c3.generate({
      bindto: '#bar-snapshots-taken',
      data: {
        x: 'x',
        columns: [data.x, data.data1],
        names: {
          data1: t('home.snapshots-taken')
        },
        colors: {
          data1: '#60b4ef'
        },
        type: 'line',
        labels: true,
        empty: {
          label: {
            text: t('home.no-data')
          }
        }
      },
      axis: {
        x: {
          type: 'category'
        },
        y: {
          show: true
        }
      },
      bar: {
        width: {
          ratio: 0.6
        }
      },
      size: {
        height: 200
      },
      legend: {
        show: false
      }
    });
  },

  serializeData() {
    if (!this.model) {
      this.model = new Bb.Model();
    }
    return {
      organization: this.model.attributes
    };
  }
});
