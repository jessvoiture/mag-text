# A Quantitative Analysis of the Textual Landscape of US Vogue Covers

As a child of the 2000s, I am no stranger to the symphony of clickbait titles that used to adorn fashion magazines. But in recent years, the covers have appeared bare.

I was set in motion to unearth the lost art of textual exuberance. In this extremely important, time sensitive, and highly requested endeavour, I analysed 22 years of US Vogue covers to ascertain if the amount of text on covers had indeed dwindled. Please, enjoy

## Methods

US Vogue magazine covers were sourced from Vogue's online archive. I manually annotated the cover lines—or text areas—on the covers, using black boxes to denote text areas and white to denote the background. I did not include the masthead which appeared in a similar size and position on every cover. Nor did I include diagonal text that occasionally appeared on a banner on top of the masthead. As this was a manual process completed over a few months, it was undoubtedly subject to inconsistencies and human error. Only covers from 2000 to 2022 were annotated as this I am a one man band, but this time period was long enough to illustrate a trend. The annotations were processed in Python using OpenCV to find the coordinates and dimensions of the black rectangles on the image and to calculate the percentage of black pixels to the total image size.
