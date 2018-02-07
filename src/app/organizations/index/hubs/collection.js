import Bn from 'backbone';
import { includes } from 'lodash';
import env from '../../../env';

const Collection = Bn.Collection.extend({
  url: `${env.API}/applications/hubs`,
  filterByValue(term) {
    const filtered = this.filter(m => this.includesAny(term, m));

    return new Collection(filtered);
  },
  includesAny(term, model) {
    return (
      includes(model.get('name'), term) ||
      includes(model.get('code'), term) ||
      includes(model.get('decription'), term)
    );
  }
});

export default Collection;
