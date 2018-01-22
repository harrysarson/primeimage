/* global describe it expect */

import { loadImg } from './loadImg.js';

describe('loadImg', () => {
  it('should load an image', async () => {
    /* eslint-disable-line */
    const src = 'data:image/gif;base64,R0lGODlhCwAOAMQfAP////7+/vj4+Hh4eHd3d/v7+/Dw8HV1dfLy8ubm5vX19e3t7fr6+nl5edra2nZ2dnx8fMHBwYODg/b29np6eujo6JGRkeHh4eTk5LCwsN3d3dfX13Jycp2dnevr6////yH5BAEAAB8ALAAAAAALAA4AAAVq4NFw1DNAX/o9imAsBtKpxKRd1+YEWUoIiUoiEWEAApIDMLGoRCyWiKThenkwDgeGMiggDLEXQkDoThCKNLpQDgjeAsY7MHgECgx8YR8oHwNHfwADBACGh4EDA4iGAYAEBAcQIg0DkgcEIQA7';
    const loadedImg = await loadImg(src);

    expect(loadedImg).to.have.attribute('src', src);
    expect(loadedImg.complete).to.be.true;
  });

  it('should handle errors', () => {
    const src = 'not a valid data uri';

    const loadingImg = loadImg(src);

    return expect(loadingImg).to.be.rejectedWith(Error)
      .that.eventually.satisfies((error) => {
        expect(error).to.have.property('source').equal(src);
        expect(error).to.have.property('img').instanceOf(HTMLImageElement);
        return true;
      });
  });

  it('should verify using a canvas that images are correct', async () => {
    const sourceCanvas = document.createElement('canvas');

    const sourceContext = sourceCanvas.getContext('2d');

    sourceContext.fillRect(1, 1, 10, 10);
    const sourceImageData = sourceContext.getImageData(0, 0, 15, 15);

    const src = sourceCanvas.toDataURL();

    const img = await loadImg(src);

    const newCanvas = document.createElement('canvas');

    const newContext = newCanvas.getContext('2d');

    newContext.drawImage(img, 0, 0);

    const newImageData = newContext.getImageData(0, 0, 15, 15);

    expect(newImageData).to.deep.equal(sourceImageData);
  });
});

