#!/bin/bash
echo "const arr = [" > arr.js
i=0
for dir in ./*
do
  if [ -d "$dir" ]; then
    printf "{\n id:$i,\n name:'" >> arr.js
    printf $dir | cut -d / -f2 >> arr.js
    truncate -s -1 arr.js
    printf "',\n list:{\n" >> arr.js

    ((i=i+1))
  
    cd $dir
    #inside mo9ri2 folder
    for d in ./*
    do
      if [ -d "$d" ]; then

        printf $d | cut -d / -f2 >> ../arr.js
        truncate -s -1 ../arr.js
        printf ":[" >> ../arr.js

        cd $d
        #inside warsh or hafs
        ls > tmp.txt

        while IFS= read -r line
        do
          if [ "$line" != "tmp.txt" ]; then
            test=`printf "$line" | cut -d . -f1`
            expr $test - 0 >> ../../arr.js

            x=`expr $test - 0`
            if [ $x -gt 0 ]
            then
              ((x=x+1))
            else
              echo $dir $line
            fi

            truncate -s -1 ../../arr.js
            printf "," >> ../../arr.js
          fi
        done < "./tmp.txt"

        rm -rf tmp.txt

        truncate -s -1 ../../arr.js

        cd ..

        printf "],\n" >> ../arr.js
      fi
    done

    printf "}, \n },\n" >> ../arr.js

    cd ..

  fi
done
echo "]" >> arr.js