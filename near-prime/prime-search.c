
#include "prime-search.h"
#include <assert.h>
#include <ctype.h>
#include <gmp.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define PROGRESS_TEMPLATE \
  "Trying to find prime by swapping %d digits (%10d/%d)"

static const int MAX_ITERATIONS_BETWEEN_PRINT = 50;

static char get_tweaked_char(char c)
{
  switch (c)
  {
  case '0':
    return '8';
    break;
  case '1':
    return '7';
    break;
  case '2':
    return '5';
    break;
  case '3':
    return '4';
    break;
  case '4':
    return '3';
    break;
  case '5':
    return '2';
    break;
  case '6':
    return '9';
    break;
  case '7':
    return '1';
    break;
  case '8':
    return '0';
    break;
  case '9':
    return '6';
    break;
  default:
    return c;
  }
}

static void tweak_string(char *s, int i)
{
  s[i] = get_tweaked_char(s[i]);
}

static int miller_rabin(const char *img, int reps)
{
  mpz_t n;
  mpz_init(n);
  mpz_set_str(n, img, 10); // read from string as base 10
  int ret = mpz_probab_prime_p(n, reps);
  mpz_clear(n);
  return ret;
}

static int bitset_get(uint8_t *bitset, int i)
{
  return bitset[i / 8] & (1UL << (i % 8));
}

static void bitset_set(uint8_t *bitset, int i, int new_value)
{
  unsigned long newbit = !!new_value;
  bitset[i / 8] ^= (-newbit ^ bitset[i / 8]) & (1UL << (i % 8));
}

static int prev_perm(uint8_t *bitset, int N)
{
  int pivot = N - 1;

  for (; pivot >= 0 && bitset_get(bitset, pivot); pivot--)
    ;

  for (; pivot >= 0 && !bitset_get(bitset, pivot); pivot--)
    ;

  if (pivot < 0)
  {
    return 0;
  }

  int rightMostFalseIndex = N - 1;

  for (; bitset_get(bitset, rightMostFalseIndex); rightMostFalseIndex--)
    ;

  bitset_set(bitset, pivot, 0);
  bitset_set(bitset, rightMostFalseIndex, 1);

  // Reverse everything after the pivot

  int k = N;

  pivot++;
  k--;

  while (pivot < k)
  {
    int tmp = bitset_get(bitset, k);
    bitset_set(bitset, k, bitset_get(bitset, pivot));
    bitset_set(bitset, pivot, tmp);
    pivot++;
    k--;
  }

  return 1;
}

static long long nCr(int n, int r)
{
  if (r > n - r)
  {
    r = n - r; // because C(n, r) == C(n, n - r)
  }

  long long ans = 1;
  int i;

  for (i = 1; i <= r; i++)
  {
    ans *= n - r + i;
    ans /= i;
  }

  return ans;
}

int find_candidate_using_bitmask(char *input, int reps, uint8_t *const bitmask, int max_iterations)
{
  int iteration_count, j;
  int res = 0;

  int len = strlen(input);
  char *const buffer = malloc(len + 1);

  for (iteration_count = 0; iteration_count < max_iterations; ++iteration_count)
  {
    strcpy(buffer, input);
    buffer[len - 1] = '1';
    for (j = 0; j < len; ++j)
    {
      if (bitset_get(bitmask, j))
        tweak_string(buffer, j);
    }
    int miller_rabin_res = miller_rabin(buffer, reps);
    if (miller_rabin_res != 0)
    {
      assert(miller_rabin_res == 1 || miller_rabin_res == 2);
      res = miller_rabin_res;
      strcpy(input, buffer);
      goto find_candidate_using_bitmask_cleanup;
    }
    if (prev_perm(bitmask, len) == 0)
    {
      res = -1;
      goto find_candidate_using_bitmask_cleanup;
    }
  }

find_candidate_using_bitmask_cleanup:
  free(buffer);
  return res;
}

int find_candidate_with_progress(char *input, int reps)
{
  int i, j;
  int res = 0;

  // Trim leading space and store in str.
  while (isspace(input[0]))
  {
    input++;
  }
  int len = strlen(input);
  while (len > 0 && isspace(input[len - 1]))
  {
    len--;
  }
  char *const str = malloc(len + 1);
  memcpy(str, input, len);
  str[len] = '\0';

  // Create bitmask with more bits in than there are bytes in input.
  uint8_t *const bitmask = malloc((len - 1) / 8 + 1);

  fprintf(stderr, "Comencing search for a prime candidate"
                  ", target is %d digits long.\n",
          len);
  fflush(stderr);

  for (i = 1; i < len; i++)
  {
    // Set first j i bits of bitmask.
    for (j = 0; j < len; j++)
    {
      if (j < i)
      {
        bitset_set(bitmask, j, 1);
      }
      else
      {
        bitset_set(bitmask, j, 0);
      }
    }

    const long long numberOfPermuations_ll = nCr(len, i);
    const int numberOfPerumations = (int)numberOfPermuations_ll;
    assert(numberOfPermuations_ll == (long long)numberOfPerumations);

    int total_iteration_count = 0;

    fprintf(stderr, PROGRESS_TEMPLATE,
            i, total_iteration_count, numberOfPerumations);
    fflush(stderr);

    int find_res;
    do
    {
      find_res = find_candidate_using_bitmask(str, reps, bitmask,
                                              MAX_ITERATIONS_BETWEEN_PRINT);
      total_iteration_count += MAX_ITERATIONS_BETWEEN_PRINT;
      fprintf(stderr, "\r" PROGRESS_TEMPLATE,
              i, total_iteration_count, numberOfPerumations);
      fflush(stderr);
    } while (find_res == 0);
    if (find_res == 1 || find_res == 2)
    {
      res = find_res;
      strcpy(input, str);
      fprintf(stderr, ": Found prime!\n");
      fflush(stderr);
      goto find_candidate_with_progress_cleanup;
    }
    else
    {
      assert(find_res == -1);
      fprintf(stderr, ": Could not find any primes.\n");
      fflush(stderr);
    }
  }

find_candidate_with_progress_cleanup:
  free(bitmask);
  free(str);
  return res;
}
