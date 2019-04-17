#ifndef PRIME_SEARCH_H
#define PRIME_SEARCH_H

#include <stdio.h>

int find_candidate_with_progress(char *numberAsString, int reps,
                                 FILE *progress);

int find_candidate(char *numberAsString, int reps);

#endif // PRIME_SEARCH_H
