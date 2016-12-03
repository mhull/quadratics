(function(){
	var a = 0;
	var b = 0;
	var c = 0;

	//Inputs for a, b, and c
	var aInput = document.querySelector('#input_1');
	var bInput = document.querySelector('#input_2');
	var cInput = document.querySelector('#input_3');

	//Submit button
	var submit = document.querySelector('#quadratic-submit');

	// Response div
	var response = document.querySelector( '#response' );

	// the number of solutions we have
	var numSolutions;

	// Onclick event for submit button
	submit.addEventListener('click', function(){

		a = sanitizeInput( aInput.value );
		b = sanitizeInput( bInput.value );
		c = sanitizeInput( cInput.value );

		// If the leading coefficient is zero, then we have a linear equation
		if( 0 === a ) {

			if( 0 === b && 0 !== c ) {

				initLog( 'Your equation has no solution' );
				return;
			}
			if( 0 === b && 0 === c ) {
				initLog( 'Any real number is a solution to this equation' );
				return;
			}

			initLog( 'This is a linear equation.  The solution is <em>x = -c / b = ' + (-c/b) + '</em>.' );
			logMessage( 'To get a quadratic equation, use a non-zero number for <em>a</em>' );
			return;
		}

		//Discriminant determines how many solutions we have
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

	function showFormula( a, b, c ) {
		logMessage( '<em>x = ( -b +/- sqrt( b<sup>2</sup> - 4ac ) ) / 2a</em>' );
		logMessage( '<em>x = ( ' + -b + ' +/- sqrt( ' + getDisc( a, b, c ) + ' ) ) / ' + 2*a + '</em>' );

		if( 1 === numSolutions ) {
			logMessage( '<em>x = ' + -b / (2*a) + '</em>' );
		}
		if(2 == numSolutions){
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
