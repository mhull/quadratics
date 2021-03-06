(function(){

	// Coefficient for x^2 provided by user
	var a = 0;

	// Coefficient for x provided by user
	var b = 0;

	// Constant number provided by user
	var c = 0;

	// Form input elements for a, b, and c
	var aInput = document.querySelector('#input_1');
	var bInput = document.querySelector('#input_2');
	var cInput = document.querySelector('#input_3');

	// Submit button
	var submit = document.querySelector('#quadratic-submit');

	// Response div
	var response = document.querySelector( '#response' );

	// the number of solutions we have
	var numSolutions;

	// Onclick event for submit button
	submit.addEventListener('click', function(){

		// sanitize the user input
		a = sanitizeInput( aInput.value );
		b = sanitizeInput( bInput.value );
		c = sanitizeInput( cInput.value );

		// If the leading coefficient is zero, then we have a linear equation and not a true quadratic
		if( 0 === a ) {

			// An equation like 3 = 0 makes no sense, no dismiss this case
			if( 0 === b && 0 !== c ) {

				initLog( 'Your equation has no solution' );
				return;
			}

			// An equation like 0 = 0 is true no matter the value of `x`
			if( 0 === b && 0 === c ) {
				initLog( 'Any real number is a solution to this equation' );
				return;
			}

			// Otherwise, we have `mx + b = 0`
			initLog( 'This is a linear equation.  The solution is <em>x = -c / b = ' + (-c/b) + '</em>.' );
			logMessage( 'To get a quadratic equation, use a non-zero number for <em>a</em>' );
			return;

		} // end if: leading coefficient is zero

		// The discriminant (b^2 - 4ac) determines how many solutions we have
		var disc = getDisc( a, b, c );

		numSolutions = getNumSolutions( disc );

		// If we have one solution
		if( 1 === numSolutions ){
			initLog( 'The equation has 1 solution, since <em>b<sup>2</sup> - 4ac = 0</em>' );
			logMessage( 'The quadratic formula gives the solution as: ' );
			showFormula( a, b, c );
		}

		// If we have two solutions
		else if( 2 === numSolutions ) {
			initLog( 'There are two solutions to the equation, since <em>b<sup>2</sup> - 4ac > 0</em>' );
			logMessage( 'The quadratic formula gives the solutions as: ' );
			showFormula( a, b, c );
		}

		// If we have no solutions
		else if( 0 === numSolutions ) {
			initLog( 'There is no real solution to the equation, since <em>b<sup>2</sup> - 4ac < 0</em>' );
		}
	}); // end: onlick for submit button

	/**
	 * Gets the discriminant of a, b, and c (b^2 - 4ac)
	 */
	function getDisc( a, b, c ) {
		return Math.pow( b, 2 ) - 4*a*c;
	}

	/**
	 * Gets the number of solutions, given the discriminant
	 *
	 * The conditions are:
	 * 	- No solutions if disc < 0
	 * 	- Two solutions if disc > 0
	 * 	- One solution if disc = 0
	 */
	function getNumSolutions( disc ) {
		return ( disc == 0 ) ? 1 : (
			( disc > 0 ) ? 2 : 0
		);
	}

	/**
	 * Shows the solution to the equation `ax^2 + bx + c = 0`, given the values of a, b, and c
	 */
	function showFormula( a, b, c ) {

		if( 1 !== numSolutions && 2 !== numSolutions ) {
			return;
		}

		logMessage( '<em>x = ( -b +/- sqrt( b<sup>2</sup> - 4ac ) ) / 2a</em>' );
		logMessage( '<em>x = ( ' + -b + ' +/- sqrt( ' + getDisc( a, b, c ) + ' ) ) / ' + 2*a + '</em>' );

		if( 1 === numSolutions ) {
			logMessage( '<em>x = ' + -b / (2*a) + '</em>' );
		}

		if( 2 === numSolutions ) {
			logMessage('<em>x = ' + (-b+Math.sqrt(getDisc( a, b, c ))) / (2*a) + '</em>');
			logMessage('or');
			logMessage('<em>x = ' + (-b-Math.sqrt(getDisc( a, b, c ))) / (2*a) + '</em>');
		}
	}

	/**
	 * Sanitizes input as an integer
	 *
	 * If a non-number is given, then we return 0
	 */
	function sanitizeInput( value ) {
		value = parseInt( value );
		if( isNaN( value ) ) {
			value = 0;
		}
		return value;
	}

	/**
	 * Initialize the log with a new message
	 */
	function initLog( message ) {
		response.innerHTML = message;
	}

	/**
	 * Append a message to the log
	 */
	function logMessage( message ) {
		response.innerHTML += '<p>' + message + '</p>';
	}
})();
