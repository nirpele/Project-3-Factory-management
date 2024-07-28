const RATE_LIMIT_PER_DAY = 2;

const logUserAction = (req, res, next) => {
  console.log(req.session.userId)
  const userId = req.session.userId; // Assuming userId is stored in session after login
  const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  const sessionKey = `${userId}:${today}`;
 
  // Check if session key exists in session storage
  if (!req.session.rateLimits) {
    console.log('hi object->  '+ userId)
    req.session.rateLimits = {};
  }

  if (!req.session.rateLimits[sessionKey]) {
    console.log('hi 0'+req.session.rateLimits[sessionKey])
    req.session.rateLimits[sessionKey] = 0;
    req.session.save((err) => {
      if (err) {
        console.error("Error saving session:", err);
      }
    });
  }

  // Check if the user has exceeded the rate limit
  if (req.session.rateLimits[sessionKey] < RATE_LIMIT_PER_DAY) {
    // Increment the counter for this session key
    req.session.rateLimits[sessionKey]++;
    req.session.save((err) => {
      if (err) {
        console.error("Error saving session:", err);
      }
    });
    console.log('hi 1'+req.session.rateLimits[sessionKey])
    next();
  } else {
    console.log('by')
    // User has exceeded the rate limit, send error response
    res.status(429).send('Rate limit exceeded');
  }
};

module.exports = { logUserAction };
