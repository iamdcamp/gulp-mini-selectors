var expressions = require('../utils/expressions'),
	libraries = require('../utils/libraries');

var classLibrary = libraries('class'),
	idLibrary = libraries('id');

/**
 * Replaces all class names with shortnames. Also builds a library of shortnames which can be
 * used to reduce other file types.
 *
 * @param file String
 * @returns {reducedFile String}
 */
module.exports =  function(file) {
	var classNameMatch = expressions.selector,
		nameMatch = expressions.selectorName;

	return file.replace(classNameMatch, function(match) {
		//exclude property values (matches ending in ';')
		if (match[match.length - 1] === ';' || match[match.length - 1] === '}') {
			return match;
		}

		//get the selector type and name
		var selectorType = match.substr(0, 1);

		return match.replace(nameMatch, function(selector) {
			switch (selectorType) {
				case '.':
					return classLibrary.get(selector, true).shortname;
					return
				case '#':
					return idLibrary.get(selector, true).shortname;
				default:
					//probably don't touch something we don't understand
					console.log('I just found this selector type and I\'m not sure what to do with it: '
						+ selectorType);
					return selector;
			}
		});
	});
};