import Mn from 'backbone.marionette';
import { history } from 'backbone';
import Template from './template.hbs';
import Model from '../model';
import storage from '../storage';
import utils from '../../utils';
import FlashesService from '../../flashes/service';
import LabelSelectorView from '../../management/labels/label-selector-view';
import OrganizationLabelModel from '../../management/labels/organization-label-model';

export default Mn.View.extend({
  template: Template,
  events: {
    'click .select-file': 'selectFile',
    'change #input-image-file': 'previewFile',
    'click #submit': 'handleSubmit'
  },
  initialize(options) {
    this.app = options.app;
    this.model = options.model || new Model();
    this.organizationLabelModel = new OrganizationLabelModel({
      organizationId: this.model.get('id') || null
    });
    this.labelSelectorView = new LabelSelectorView({
      app: this.app,
      toFilter: false
    });
  },

  serializeData() {
    return {
      organization: this.model.attributes,
      isNew: this.model.get('id') === undefined,
      logoImage: this.model.get('logoUrl') || '/static/images/icon_camara.png'
    };
  },
  selectFile() {
    this.$el.find('#input-image-file').click();
  },
  previewFile() {
    var self = this;
    var reader = new FileReader();
    let logoImage = this.$el.find('#image-logo');
    reader.onload = () => {
      self.file = reader.result;
      logoImage.attr('src', self.file);
    };
    reader.readAsDataURL(this.$el.find('#input-image-file').prop('files')[0]);
  },
  handleSubmit(event) {
    event.preventDefault();
    let self = this;
    const session = this.app.getSession();
    const button = utils.getLoadingButton(this.$el.find('#submit'));

    this.$el
      .find('#form')
      .serializeArray()
      .forEach(element => {
        this.model.set(element.name, element.value);
      });
    this.model.set('application', session.get('user').application);
    this.model.set('file', this.file);

    let errors = this.model.validate();

    if (errors) {
      errors.forEach(error => {
        FlashesService.request('add', {
          timeout: 3000,
          type: 'danger',
          title: error
        });
      });
      button.reset();
      return;
    }

    button.loading();

    storage
      .save(this.model)
      .then(() => {
        button.reset();
        self.addLabels();
        history.navigate('management/organizations', { trigger: true });
        FlashesService.request('add', {
          timeout: 3000,
          type: 'info',
          title: t('organization.save.success')
        });
      })
      .catch(response => {
        if (response.status === 400) {
          FlashesService.request('add', {
            timeout: 3000,
            type: 'danger',
            title: t('organization.save.failed')
          });
        }
        button.reset();
      });
  },
  getOrganizationLabels() {
    var self = this;
    this.organizationLabelModel.fetch({
      success(model, response) {
        if (response && response.length > 0)
          self.labelSelectorView.setLabels(response);
      }
    });
  },
  addLabels() {
    this.organizationLabelModel.set(
      'labelId',
      this.labelSelectorView.getLabelsSelected()
    );
    this.organizationLabelModel.save();
  }
});
