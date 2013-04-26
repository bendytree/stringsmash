
# String Smash

What it does: Compresses a string so that it can be embedded as a variable in JavaScript.

Sometimes you need to embed really long strings in JavaScript. Ok, rarely. But say
you embed some css in JavaScript and the strings repeat a lot. What if you could
use JavaScript variables to reduce the repitition? You could save KB in downloads.
This is a quick proof of concept.

## Before:

    var css = 'superlongword superlongword superlongword superlongword superlongword superlongword superlongword';


## End Result:

    var css = (function(){var a='superlongword';return [a,' ',a,' ',a,' ',a,' ',a,' ',a,' ',a].join('');})();

Whoo hoo! We saved 5 characters! OK not much compression, but longer strings yield better results.

## Usage:

    var css = 'superlongword superlongword superlongword superlongword superlongword superlongword superlongword';
    var result = smashjs(css);

    console.log(result);       // logs: (function(){var a='superlongword...
    console.log(eval(result)); // logs: superlongword superlongword supe...

## Real Life Results

I built this so I could embed some CSS in a lightweight javascript library. Since my goal was to have a small library, i wanted the CSS embedded so there'd only be one script reference people would pull in. (as opposed to libs that have css and image bundles too)

Preliminary tests showed about 25% reduction in the line of CSS.

Then I started wondering if this would end up being less efficient because of gzip. In other words, would gzip do better than stringsmash + gzip.  Here were my results:

    //without stringmash
	raw js:   13,408 bytes (4,276 gzipped)
	minified: 8,465 (2,988 gzipped)

    //with stringmash
	raw js:   12,481 bytes (4,416 gzipped)
	minified: 6,964 (3,104 gzipped)

The stringsmash version was 18% smaller **before** gzip.

The non-stringsmash version was 4% smaller **after** gzip.

Since I'm building a lib for others & don't have control over them gzipping, I'll likely go with stringsmash since the payoff is fairly large for non-gzipping servers and small for gzippers.

