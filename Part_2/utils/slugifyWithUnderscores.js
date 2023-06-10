module.exports.slugifyWithUnderscores = (string) => {
    return string.toLowerCase().replace(/-/g, '_').trim();
};