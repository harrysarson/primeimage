#ifndef PRIME_SEARCH_H
#define PRIME_SEARCH_H

#include <stdint.h>
#include <stdio.h>

/* Find a candidate prime with similar digits to `input`, the result is stored in
 * `input` if found. The probability of the resulting number being prime is
 * determined by `reps` which is passsed to `mpz_probab_prime_p()`.
 *
 * The value of `bitmask` will be permutated upto `max_iterations` times in the
 * search for a prime candidate.
 *
 * Return codes:
 *  0 = no candidates found in max_iterations.
 * -1 = no candidates found and all permutations of bitmask tried.
 *  1 = found probably prime number.
 *  2 = found definitely prime number.
 */
int find_candidate_using_bitmask(char *input, int reps, uint8_t *bitmask, int max_iterations);

/* Find a candidate prime with similar digits to `numberAsString`, the result is stored in
 * `numberAsString` if found. The probability of the resulting number being prime is
 * determined by `reps` which is passsed to `mpz_probab_prime_p()`.
 *
 * Textual progress is written `progress` if it is not null.
 *
 * Return codes:
 *  1 = found probably prime number.
 *  2 = found definitely prime number.
 */
int find_candidate_with_progress(char *numberAsString, int reps,
                                 FILE *progress);

/* Like `find_candidate_with_progress` where progress is printed on stdout.
 */
int find_candidate_stdout(char *numberAsString, int reps);

#endif // PRIME_SEARCH_H
