import { ConjuntosPage } from './app.po';

describe('conjuntos App', () => {
  let page: ConjuntosPage;

  beforeEach(() => {
    page = new ConjuntosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
