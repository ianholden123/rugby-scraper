const playerPositionsHelper = require('./playerPositions');

describe('isForward', () => {
  test('if no parameters are provided, return null', () => {
    expect(playerPositionsHelper.isForward()).toEqual(null);
    expect(playerPositionsHelper.isForward(undefined)).toEqual(null);
    expect(playerPositionsHelper.isForward('')).toEqual(null);
  });

  test('if invalid parameters are provided, throw error', () => {
    expect(() => {
      playerPositionsHelper.isForward(1);
    }).toThrow(Error);
    expect(() => {
      playerPositionsHelper.isForward({});
    }).toThrow(Error);
    expect(() => {
      playerPositionsHelper.isForward([]);
    }).toThrow(Error);
  });

  test('if valid parameters are provided, return whether a player is a forward or not', () => {
    expect(playerPositionsHelper.isForward('Lock')).toEqual(true);
    expect(playerPositionsHelper.isForward('lock')).toEqual(true);
    expect(playerPositionsHelper.isForward('Hooker')).toEqual(true);
    expect(playerPositionsHelper.isForward('Prop')).toEqual(true);
    expect(playerPositionsHelper.isForward('No 8')).toEqual(true);
    expect(playerPositionsHelper.isForward('Number 8')).toEqual(true);
    expect(playerPositionsHelper.isForward('Flanker')).toEqual(true);
    expect(playerPositionsHelper.isForward('Front Row')).toEqual(true);
    expect(playerPositionsHelper.isForward('Front-Row')).toEqual(true);
    expect(playerPositionsHelper.isForward('Second Row')).toEqual(true);
    expect(playerPositionsHelper.isForward('Second-Row')).toEqual(true);
    expect(playerPositionsHelper.isForward('Back Row')).toEqual(true);
    expect(playerPositionsHelper.isForward('Back-Row')).toEqual(true);
    expect(playerPositionsHelper.isForward('Back Row, Second Row')).toEqual(true);
    expect(playerPositionsHelper.isForward('Utility Forward')).toEqual(true);

    expect(playerPositionsHelper.isForward('Scrum Half')).toEqual(false);
    expect(playerPositionsHelper.isForward('Scrum-Half')).toEqual(false);
    expect(playerPositionsHelper.isForward('Fly Half')).toEqual(false);
    expect(playerPositionsHelper.isForward('Fly-Half')).toEqual(false);
    expect(playerPositionsHelper.isForward('Centre')).toEqual(false);
    expect(playerPositionsHelper.isForward('Inside Centre')).toEqual(false);
    expect(playerPositionsHelper.isForward('Inside-Centre')).toEqual(false);
    expect(playerPositionsHelper.isForward('Outside Centre')).toEqual(false);
    expect(playerPositionsHelper.isForward('Outside-Centre')).toEqual(false);
    expect(playerPositionsHelper.isForward('Full Back')).toEqual(false);
    expect(playerPositionsHelper.isForward('Full-Back')).toEqual(false);
    expect(playerPositionsHelper.isForward('Wing')).toEqual(false);
    expect(playerPositionsHelper.isForward('Winger')).toEqual(false);
    expect(playerPositionsHelper.isForward('Full Back, Wing')).toEqual(false);
    expect(playerPositionsHelper.isForward('Outside Back')).toEqual(false);
    expect(playerPositionsHelper.isForward('Utility Back')).toEqual(false);
  });
});

describe('isBack', () => {
  test('if no parameters are provided, return null', () => {
    expect(playerPositionsHelper.isBack()).toEqual(null);
    expect(playerPositionsHelper.isBack(undefined)).toEqual(null);
    expect(playerPositionsHelper.isBack('')).toEqual(null);
  });

  test('if invalid parameters are provided, throw error', () => {
    expect(() => {
      playerPositionsHelper.isBack(1);
    }).toThrow(Error);
    expect(() => {
      playerPositionsHelper.isBack({});
    }).toThrow(Error);
    expect(() => {
      playerPositionsHelper.isBack([]);
    }).toThrow(Error);
  });

  test('if valid parameters are provided, return whether a player is a back or not', () => {
    expect(playerPositionsHelper.isBack('Scrum Half')).toEqual(true);
    expect(playerPositionsHelper.isBack('Scrum-Half')).toEqual(true);
    expect(playerPositionsHelper.isBack('Fly Half')).toEqual(true);
    expect(playerPositionsHelper.isBack('Fly-Half')).toEqual(true);
    expect(playerPositionsHelper.isBack('Centre')).toEqual(true);
    expect(playerPositionsHelper.isBack('Inside Centre')).toEqual(true);
    expect(playerPositionsHelper.isBack('Inside-Centre')).toEqual(true);
    expect(playerPositionsHelper.isBack('Outside Centre')).toEqual(true);
    expect(playerPositionsHelper.isBack('Outside-Centre')).toEqual(true);
    expect(playerPositionsHelper.isBack('Full Back')).toEqual(true);
    expect(playerPositionsHelper.isBack('Full-Back')).toEqual(true);
    expect(playerPositionsHelper.isBack('Wing')).toEqual(true);
    expect(playerPositionsHelper.isBack('Winger')).toEqual(true);
    expect(playerPositionsHelper.isBack('Full Back, Wing')).toEqual(true);
    expect(playerPositionsHelper.isBack('Outside Back')).toEqual(true);
    expect(playerPositionsHelper.isBack('Utility Back')).toEqual(true);

    expect(playerPositionsHelper.isBack('Lock')).toEqual(false);
    expect(playerPositionsHelper.isBack('lock')).toEqual(false);
    expect(playerPositionsHelper.isBack('Hooker')).toEqual(false);
    expect(playerPositionsHelper.isBack('Prop')).toEqual(false);
    expect(playerPositionsHelper.isBack('No 8')).toEqual(false);
    expect(playerPositionsHelper.isBack('Number 8')).toEqual(false);
    expect(playerPositionsHelper.isBack('Flanker')).toEqual(false);
    expect(playerPositionsHelper.isBack('Front Row')).toEqual(false);
    expect(playerPositionsHelper.isBack('Front-Row')).toEqual(false);
    expect(playerPositionsHelper.isBack('Second Row')).toEqual(false);
    expect(playerPositionsHelper.isBack('Second-Row')).toEqual(false);
    expect(playerPositionsHelper.isBack('Back Row')).toEqual(false);
    expect(playerPositionsHelper.isBack('Back-Row')).toEqual(false);
    expect(playerPositionsHelper.isBack('Back Row, Second Row')).toEqual(false);
    expect(playerPositionsHelper.isBack('Utility Forward')).toEqual(false);
  });
});
