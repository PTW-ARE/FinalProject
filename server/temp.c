#include <stdio.h>
int main ( ) {
     int r, c; // r - row, c - column

     for (r = 20; r > 0; r--) {
          for (c = 0; c < r; c++) {
               printf("*
          printf("\n");
     }
     return 0;
}