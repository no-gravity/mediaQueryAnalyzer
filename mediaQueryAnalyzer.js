window.mediaQueries=function()
{
 getTemplatedMediaQueries();
}

window.addEventListener('resize', function() {
	getTemplatedMediaQueries();
});

let html=document.createElement("div");
document.body.appendChild(html);
html.outerHTML=`
	<style>
		#mediaQueriesInfo
		{
			position: fixed;
			left: 0;
			top: 0;
			opacity: 0.5;
			z-Index: 1000000;
		}
	</style>
	<div id=mediaQueriesInfo></div>
`;

window.addEventListener('load', function() {
	getTemplatedMediaQueries();
});

// ----------------------------------------------------------------------------
// Functions
// ----------------------------------------------------------------------------

function getTemplatedMediaQueries()
{
	let queries=getMediaQueries();
	let s="";
	s+=window.innerWidth + " x " + window.innerHeight +"<br>";
	queries.forEach(q=>{
		if (window.matchMedia(q).matches) s+="* "; 
		s+=q+"<br>";
	});
	document.querySelector("#mediaQueriesInfo").innerHTML=s;
}

function getMediaQueries()
{
	let r = [];
	let sheets = document.styleSheets;
	for (let i=0; i<sheets.length; i++)
	{
		let rules = sheets[i].cssRules;
		for (let j=0; j<rules.length; j++)
		{
			if (rules[j].type == CSSRule.MEDIA_RULE)
			{
				let rule=rules[j].media.mediaText;
				// No idea why some queries appear twice
				// Let's ignore dupes:
				if (r.includes(rule)) continue;	
				r.push(rule);
			}
		}
	}
	return r;
}
