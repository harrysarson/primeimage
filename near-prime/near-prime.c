#include "prime-search.h"
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define BUFFER_LENGTH 4

int main(int argc, char **argv)
{
  if (argc == 1 || (argc > 1 && (strcmp(argv[1], "-h") == 0 ||
                                 strcmp(argv[1], "--help") == 0)))
  {
    fprintf(stdout, "Usage: near-prime k [progress-file]\n"
                    "\n"
                    "Convert a number to a prime.\n"
                    "\n"
                    "A number is read from stdin and a near prime number is outputted "
                    "to stdout.\n"
                    "\n"
                    "k\t\tDetermine the probability that the generated number is prime\n"
                    "\t\tand is passed to mpz_probab_prime_p (see\n"
                    "\t\thttps://gmplib.org/manual/Number-Theoretic-Functions.html).\n");
    return 1;
  }
  else
  {
    // Get reps from CL args's.

    char *str_end;
    int reps = strtol(argv[1], &str_end, 10);
    if (errno == ERANGE)
    {
      fprintf(stderr, "near-prime: %s is not a valid value for reps",
              argv[1]);
      exit(1);
    }
    if (str_end == argv[1])
    {
      fprintf(stderr, "near-prime: %s is not a valid value for reps",
              argv[1]);
      exit(1);
    }

    // Get input from stdin.

    char *number = malloc(1);
    number[0] = '\0';
    size_t number_length = 0;

    char buffer[BUFFER_LENGTH];
    fprintf(stdout, "Enter the number to convert to a prime and press enter:\n");

    do
    {
      char *gotstring = fgets(buffer, BUFFER_LENGTH, stdin);

      if (ferror(stdin))
      {
        perror("near-prime cannot read number");
        exit(1);
      }

      if (gotstring == NULL)
      {
        break;
      }

      number_length += strlen(buffer);
      number = realloc(number, number_length + 1);
      strcat(number, buffer);
    } while (feof(stdin) == 0 && number[number_length - 1] != '\n');

    int res = find_candidate_with_progress(number, reps);
    int return_code = 10;

    switch (res)
    {
    case 1:
    case 2:
      printf("Found prime candidate:\n%s\n", number);
      return_code = 0;
      break;
    case 0:
      fprintf(stderr, "Error: cannot find a prime number\n");
      return_code = 1;
      break;
    default:
      fprintf(stderr, "Error: got return code = %d\n", res);
      return_code = res;
    }
    free(number);
    return return_code;
  }
}
