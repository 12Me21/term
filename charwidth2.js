function searchRanges(ranges, target) {
	// todo: use binary search
	var i=0;
	while (ranges[i*2] < target) {
		i++;
	}
	console.log(i);
	return ranges[(i-1)*2+1];
}

var windows10Terminal = {
	maxChar: 65536,
	ranges: [
		0x0, 1,
		0xA1, 1.5,
		0xA2, 1,
		0xA4, 1.5,
		0xA5, 1,
		0xA7, 1.5,
		0xA9, 1,
		0xAA, 1.5,
		0xAB, 1,
		0xAD, 1.5,
		0xAF, 1,
		0xB0, 1.5,
		0xB5, 1,
		0xB6, 1.5,
		0xBB, 1,
		0xBC, 1.5,
		0xC0, 1,
		0xC6, 1.5,
		0xC7, 1,
		0xD0, 1.5,
		0xD1, 1,
		0xD7, 1.5,
		0xD9, 1,
		0xDE, 1.5,
		0xE2, 1,
		0xE6, 1.5,
		0xE7, 1,
		0xE8, 1.5,
		0xEB, 1,
		0xEC, 1.5,
		0xEE, 1,
		0xF0, 1.5,
		0xF1, 1,
		0xF2, 1.5,
		0xF4, 1,
		0xF7, 1.5,
		0xFB, 1,
		0xFC, 1.5,
		0xFD, 1,
		0xFE, 1.5,
		0xFF, 1,
		0x101, 1.5,
		0x102, 1,
		0x111, 1.5,
		0x112, 1,
		0x113, 1.5,
		0x114, 1,
		0x11B, 1.5,
		0x11C, 1,
		0x126, 1.5,
		0x128, 1,
		0x12B, 1.5,
		0x12C, 1,
		0x131, 1.5,
		0x134, 1,
		0x138, 1.5,
		0x139, 1,
		0x13F, 1.5,
		0x143, 1,
		0x144, 1.5,
		0x145, 1,
		0x148, 1.5,
		0x14C, 1,
		0x14D, 1.5,
		0x14E, 1,
		0x152, 1.5,
		0x154, 1,
		0x166, 1.5,
		0x168, 1,
		0x16B, 1.5,
		0x16C, 1,
		0x1CE, 1.5,
		0x1CF, 1,
		0x1D0, 1.5,
		0x1D1, 1,
		0x1D2, 1.5,
		0x1D3, 1,
		0x1D4, 1.5,
		0x1D5, 1,
		0x1D6, 1.5,
		0x1D7, 1,
		0x1D8, 1.5,
		0x1D9, 1,
		0x1DA, 1.5,
		0x1DB, 1,
		0x1DC, 1.5,
		0x1DD, 1,
		0x251, 1.5,
		0x252, 1,
		0x261, 1.5,
		0x262, 1,
		0x2C4, 1.5,
		0x2C5, 1,
		0x2C7, 1.5,
		0x2C8, 1,
		0x2C9, 1.5,
		0x2CC, 1,
		0x2CD, 1.5,
		0x2CE, 1,
		0x2D0, 1.5,
		0x2D1, 1,
		0x2D8, 1.5,
		0x2DC, 1,
		0x2DD, 1.5,
		0x2DE, 1,
		0x2DF, 1.5,
		0x2E0, 1,
		0x300, 1.5,
		0x370, 1,
		0x391, 1.5,
		0x3A2, 1,
		0x3A3, 1.5,
		0x3AA, 1,
		0x3B1, 1.5,
		0x3C2, 1,
		0x3C3, 1.5,
		0x3CA, 1,
		0x401, 1.5,
		0x402, 1,
		0x410, 1.5,
		0x450, 1,
		0x451, 1.5,
		0x452, 1,
		0x1100, 2,
		0x1160, 1,
		0x2010, 1.5,
		0x2011, 1,
		0x2013, 1.5,
		0x2017, 1,
		0x2018, 1.5,
		0x201A, 1,
		0x201C, 1.5,
		0x201E, 1,
		0x2020, 1.5,
		0x2023, 1,
		0x2024, 1.5,
		0x2028, 1,
		0x2030, 1.5,
		0x2031, 1,
		0x2032, 1.5,
		0x2034, 1,
		0x2035, 1.5,
		0x2036, 1,
		0x203B, 1.5,
		0x203C, 1,
		0x203E, 1.5,
		0x203F, 1,
		0x2074, 1.5,
		0x2075, 1,
		0x207F, 1.5,
		0x2080, 1,
		0x2081, 1.5,
		0x2085, 1,
		0x20AC, 1.5,
		0x20AD, 1,
		0x2103, 1.5,
		0x2104, 1,
		0x2105, 1.5,
		0x2106, 1,
		0x2109, 1.5,
		0x210A, 1,
		0x2113, 1.5,
		0x2114, 1,
		0x2116, 1.5,
		0x2117, 1,
		0x2121, 1.5,
		0x2123, 1,
		0x2126, 1.5,
		0x2127, 1,
		0x212B, 1.5,
		0x212C, 1,
		0x2153, 1.5,
		0x2155, 1,
		0x215B, 1.5,
		0x215F, 1,
		0x2160, 1.5,
		0x216C, 1,
		0x2170, 1.5,
		0x217A, 1,
		0x2189, 1.5,
		0x218A, 1,
		0x2190, 1.5,
		0x219A, 1,
		0x21B8, 1.5,
		0x21BA, 1,
		0x21D2, 1.5,
		0x21D3, 1,
		0x21D4, 1.5,
		0x21D5, 1,
		0x21E7, 1.5,
		0x21E8, 1,
		0x2200, 1.5,
		0x2201, 1,
		0x2202, 1.5,
		0x2204, 1,
		0x2207, 1.5,
		0x2209, 1,
		0x220B, 1.5,
		0x220C, 1,
		0x220F, 1.5,
		0x2210, 1,
		0x2211, 1.5,
		0x2212, 1,
		0x2215, 1.5,
		0x2216, 1,
		0x221A, 1.5,
		0x221B, 1,
		0x221D, 1.5,
		0x2221, 1,
		0x2223, 1.5,
		0x2224, 1,
		0x2225, 1.5,
		0x2226, 1,
		0x2227, 1.5,
		0x222D, 1,
		0x222E, 1.5,
		0x222F, 1,
		0x2234, 1.5,
		0x2238, 1,
		0x223C, 1.5,
		0x223E, 1,
		0x2248, 1.5,
		0x2249, 1,
		0x224C, 1.5,
		0x224D, 1,
		0x2252, 1.5,
		0x2253, 1,
		0x2260, 1.5,
		0x2262, 1,
		0x2264, 1.5,
		0x2268, 1,
		0x226A, 1.5,
		0x226C, 1,
		0x226E, 1.5,
		0x2270, 1,
		0x2282, 1.5,
		0x2284, 1,
		0x2286, 1.5,
		0x2288, 1,
		0x2295, 1.5,
		0x2296, 1,
		0x2299, 1.5,
		0x229A, 1,
		0x22A5, 1.5,
		0x22A6, 1,
		0x22BF, 1.5,
		0x22C0, 1,
		0x2312, 1.5,
		0x2313, 1,
		0x231A, 2,
		0x231C, 1,
		0x2329, 2,
		0x232B, 1,
		0x23E9, 2,
		0x23ED, 1,
		0x23F0, 2,
		0x23F1, 1,
		0x23F3, 2,
		0x23F4, 1,
		0x2460, 1.5,
		0x24EA, 1,
		0x24EB, 1.5,
		0x25A2, 1,
		0x25A3, 1.5,
		0x25AA, 1,
		0x25B2, 1.5,
		0x25B4, 1,
		0x25B6, 1.5,
		0x25B8, 1,
		0x25BC, 1.5,
		0x25BE, 1,
		0x25C0, 1.5,
		0x25C2, 1,
		0x25C6, 1.5,
		0x25C9, 1,
		0x25CB, 1.5,
		0x25CC, 1,
		0x25CE, 1.5,
		0x25D2, 1,
		0x25E2, 1.5,
		0x25E6, 1,
		0x25EF, 1.5,
		0x25F0, 1,
		0x25FD, 2,
		0x25FF, 1,
		0x2605, 1.5,
		0x2607, 1,
		0x2609, 1.5,
		0x260A, 1,
		0x260E, 1.5,
		0x2610, 1,
		0x2614, 2,
		0x2616, 1,
		0x261C, 1.5,
		0x261D, 1,
		0x261E, 1.5,
		0x261F, 1,
		0x2640, 1.5,
		0x2641, 1,
		0x2642, 1.5,
		0x2643, 1,
		0x2648, 2,
		0x2654, 1,
		0x2660, 1.5,
		0x2662, 1,
		0x2663, 1.5,
		0x2666, 1,
		0x2667, 1.5,
		0x266B, 1,
		0x266C, 1.5,
		0x266E, 1,
		0x266F, 1.5,
		0x2670, 1,
		0x267F, 2,
		0x2680, 1,
		0x2693, 2,
		0x2694, 1,
		0x269E, 1.5,
		0x26A0, 1,
		0x26A1, 2,
		0x26A2, 1,
		0x26AA, 2,
		0x26AC, 1,
		0x26BD, 2,
		0x26BF, 1,
		0x26C4, 2,
		0x26C6, 1,
		0x26CE, 2,
		0x26CF, 1,
		0x26D4, 2,
		0x26D5, 1,
		0x26E3, 1.5,
		0x26E4, 1,
		0x26E8, 1.5,
		0x26EA, 1,
		0x26EB, 1.5,
		0x26F2, 1,
		0x26F4, 1.5,
		0x26F5, 1,
		0x26F6, 1.5,
		0x26FA, 1,
		0x26FB, 1.5,
		0x26FD, 1,
		0x26FE, 1.5,
		0x2700, 1,
		0x2705, 2,
		0x2706, 1,
		0x270A, 2,
		0x270C, 1,
		0x2728, 2,
		0x2729, 1,
		0x273D, 1.5,
		0x273E, 1,
		0x274C, 2,
		0x274D, 1,
		0x274E, 2,
		0x274F, 1,
		0x2753, 2,
		0x2756, 1,
		0x2757, 2,
		0x2758, 1,
		0x2776, 1.5,
		0x2780, 1,
		0x2795, 2,
		0x2798, 1,
		0x27B0, 2,
		0x27B1, 1,
		0x27BF, 2,
		0x27C0, 1,
		0x2B1B, 2,
		0x2B1D, 1,
		0x2B50, 2,
		0x2B51, 1,
		0x2B55, 2,
		0x2B56, 1,
		0x2E80, 2,
		0x303F, 1,
		0x3041, 2,
		0x3097, 1,
		0x3099, 2,
		0x3100, 1,
		0x3105, 2,
		0x312F, 1,
		0x3131, 2,
		0x318F, 1,
		0x3190, 2,
		0x3248, 1,
		0x3250, 2,
		0x4DC0, 1,
		0x4E00, 2,
		0xA4C7, 1,
		0xAC00, 2,
		0xD7A4, 1,
		0xE000, 1.5,
		0xF900, 1,
		0xFE00, 1.5,
		0xFE10, 1,
		0xFF01, 2,
		0xFF61, 1,
		0xFFE0, 2,
		0xFFE7, 1,
		0xFFFD, 1.5,
	],
}

windows10Terminal.width = function(chr, wide) {
	if (chr > 0xFFFF)
		return -1;
	var width = searchRanges(windows10Termial.ranges, chr);
	if (width == 1.5)
		return 1; //there's no reliable way to tell, ugh
	return width
	// I'll just assume you're using a font where none of these chars are defined anyway whatever
// todo: check for combining chars and other invalid (in this terminal) stuff
}

console.log(searchRanges(windows10Terminal.ranges, 0xFF20))
