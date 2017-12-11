import ReadFile from '../lib/ReadFile.js';
import loadImg from '../lib/loadImg.js';

export const types = [
  'moveStage',
  'setStage',
  'selectFile',
  'loadFile',
].reduce((obj, type) => Object.assign(obj, { [type]: type }), {});

export const creators = {
  moveStage: change => ({
    type: types.moveStage,
    change,
  }),
  setStage: newStage => ({
    type: types.setStage,
    newStage,
  }),
  selectFile: file => ({
    type: types.selectFile,
    file,
  }),
  loadFile: Object.assign(
    function loadFile(file) {
      return async (dispatch) => {
        try {
          dispatch(loadFile.begin(file));

          if (!file) {
            throw new Error('null file provided');
          }

          const dataUrl = await new ReadFile(file).asDataURL(file);

          const img = await loadImg(dataUrl);

          return dispatch(loadFile.complete(img));
        } catch (err) {
          dispatch(loadFile.error(err));
          throw err;
        }
      };
    },
    {
      begin: file => ({
        type: types.loadFile,
        status: 'begin',
        file,
      }),
      error: error => ({
        type: types.loadFile,
        status: 'error',
        error,
      }),
      complete: img => ({
        type: types.loadFile,
        status: 'end',
        img,
      }),
    },
  ),
};

Object.freeze(types);
Object.freeze(creators);
