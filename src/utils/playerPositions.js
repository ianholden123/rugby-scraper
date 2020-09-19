let playerPositionsHelper = (module.exports = {});

/**
 * Given a player position, return whether this player is a forward
 * @param {string} playerPosition The player's position
 */
playerPositionsHelper.isForward = (playerPosition) => {
  if (!playerPosition) return null
  if (typeof playerPosition !== 'string') throw new Error('Please provide a valid player position.')

  const regex = /(lock|hooker|prop|8|eight|flanker|row|forward)/g;
  return regex.test(playerPosition.toLowerCase());
}

/**
 * Given a player position, return whether this player is a back
 * @param {string} playerPosition The player's position
 */
playerPositionsHelper.isBack = (playerPosition) => {
  if (!playerPosition) return null
  if (typeof playerPosition !== 'string') throw new Error('Please provide a valid player position.')

  const regex = /(half|centre|full|wing|back(?!.*row))/g;
  return regex.test(playerPosition.toLowerCase());
}